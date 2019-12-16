// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { VariableSizeGrid } from 'react-window'
import useResizeAware from 'react-resize-aware'
import * as Spec from 'js-spec/validators'

import { Checkbox } from 'office-ui-fabric-react'

// internal imports
import defineStyles from '../tools/defineStyles'
import classNames from '../tools/classNames'
import defineActions from '../tools/defineActions'

// derived imports
const { useState } = React

// --- constants -----------------------------------------------------

const SELECTION_COLUMN_WIDTH = 38

// --- components ----------------------------------------------------

const DataTable = component<DataTableProps>({
  displayName: 'DataTable',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataTableProps) }
    : null,
 
  render: DataTableView
})

// --- types ---------------------------------------------------------

type DataTableProps = {
  title?: string | null,
  
  rowSelectionMode?: 'none' | 'single' | 'multi',

  sortBy?: string | null,
  sortDir?: 'asc' | 'desc',

  columns: {
    title: string, 
    field?: string | null,
    align?: 'start' | 'center' | 'end',
    width?: number,
    sortable?: boolean
  }[],

  data: Item[],

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void,

  ref?: any // TODO
}

type DataTableState = {
  selectedItems: Set<Item>
}

type DataTableActions = ReturnType<typeof useDataTableActions>[0]
type Item = Record<string, any>
type ColumnWidths = { selectionColumn: number, dataColumns: number[] }

type RowSelectionChangeEvent = any // TODO
type SortChangeEvent = any // TODO

type DataTableClasses = ReturnType<typeof useDataTableStyles>

// --- validation ----------------------------------------------------

const validateDataTableProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDataTableStyles = defineStyles(theme => {
  return {
    root: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    },

    tableContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    rowSelectionColumn: {
    },

    tableHead: {
      display: 'flex',
      border: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralTertiary
    },
  
    tableHeadCell: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px',
      borderStyle: 'solid',
      borderWidth: '0 0 0 1px',
      borderColor: theme.palette.neutralTertiary,
      fontWeight: 500,
      borderSizing: 'border-box',

      selectors: {
        '&:first-child': {
          borderWidth: 0
        },

        '&:hover': {
          backgroundColor: theme.palette.neutralLighter
        },

        '&:active': {
          backgroundColor: theme.palette.neutralLight
        }
      }
    },

    tableHeadCellContent: {
      display: 'flex',
      flexWrap: 'nowrap'
    },

    tableBodyCell: {
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: theme.fonts.medium.fontSize,
      padding: '3px 8px',
      boxSizing: 'border-box'
    },

    evenRow: {
      backgroundColor: theme.palette.neutralLighterAlt
    },

    allRowsSelectionCell: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3px 0 0 8px'
    },

    rowSelectionCell: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1px 0 0 11px'
    }
  }
})

// --- view ----------------------------------------------------------

function DataTableView(props: DataTableProps) {
  const
    [actions, state] = useDataTableActions(),
    classes = useDataTableStyles(),
    [selectedRows] = useState(() => new Set<any>()), // TODO
    [resizeListener, size] = useResizeAware(),
    tableSizeIsKnown = size.width !== null,

    columnWidths = tableSizeIsKnown
       ? calculateColumnWidths(props.columns, props.rowSelectionMode !== 'none', size.width)
       : null,

    tableHead = !tableSizeIsKnown
      ? null
      : renderHead(
        props,
        state,
        actions,
        classes,
        columnWidths
      ),

    table = !tableSizeIsKnown
      ? null
      : renderTableBody(
          props,
          state,
          actions, 
          classes,
          size.width,
          size.height
        )

  return (
    <div className={classes.root}>
      {tableHead}
      <div className={classes.tableContainer}>
        {resizeListener}
        {table}
      </div>
    </div>
  )
}

function renderHead(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions, 
  classes: DataTableClasses,
  columnWidths: ColumnWidths | null 
) { // TODO
  const
    minWidth = columnWidths
      ? columnWidths.selectionColumn
      : SELECTION_COLUMN_WIDTH + 'px',

    selectionColumn =
      props.rowSelectionMode !== 'single' && props.rowSelectionMode !== 'multi'
        ? null
        : <div className={classes.rowSelectionColumn} style={{
            minWidth
          }}>
            <div className={classes.allRowsSelectionCell}>
              {
                props.rowSelectionMode === 'multi'
                  ? renderSelectAllRowsCheckbox(props, state, actions, classes)
                  : null
              }
            </div>
          </div>

  return (
    <div className={classes.tableHead}>
      {selectionColumn}
      {
        props.columns.map((column, columnIdx) =>
          renderTableHeadCell(
            props, state, actions, classes, columnIdx, columnWidths))
      }
    </div>
  )
}

function renderTableHeadCell(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions,
  classes: DataTableClasses,
  columnIdx: number,
  columnWidths: ColumnWidths | null
) {
  const
    column = props.columns[columnIdx],
    sortable = props.columns[columnIdx].sortable,
    isSorted = props.sortBy !== null && props.sortBy === column.field,
    width = !columnWidths ? '' : columnWidths.dataColumns[columnIdx],

    sortIcon = // TODO
      <div style={{ width: '20px', height: '20px' }}>
        {
          sortable && isSorted
            ? (props.sortDir === 'asc' ? '(asc)' : '(desc)') // TODO
            : null
        }
      </div>,

    onClick = 
      !sortable && column.field
        ? null
        : () => {
          /// TODO //changeSort(column.field!, isSorted ? sortDir !== 'desc' : false)
        } 

  return (
    <div
      key={columnIdx}
      data-sortable={String(sortable)}
      onClick={onClick || undefined}
      style={{ width, minWidth: width, maxWidth: width }}
      className={classes.tableHeadCell}
    >
      <div className={classes.tableHeadCellContent}>
        {column.title}
        {sortIcon}
      </div>
    </div>
  )
}

function renderSelectAllRowsCheckbox(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions,
  classes: DataTableClasses
) { // TODO
  const
    rowSelectionSize = state.selectedItems.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === props.data.length
  
  return (
    <Checkbox
      checked={checked}

      checkmarkIconProps={{
        iconName: 'jsc:checkmark'
      }}

      onChange={
        () => checked
          ? actions.unselectAllItems()
          : actions.selectItems(props.data)
      }
    />
  )
}

function renderTableBody(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions, 
  classes: DataTableClasses,
  width: number,
  height: number,
) {
  const
    hasSelectionColumn =
      props.rowSelectionMode === 'single' || props.rowSelectionMode === 'multi', 
    
    indexFirstDataColumn = Number(hasSelectionColumn),
    columnWidths = calculateColumnWidths(props.columns, hasSelectionColumn, width)

  return (
    <VariableSizeGrid key={Math.random()} // TODO
      columnCount={props.columns.length + indexFirstDataColumn}
      rowCount={props.data.length}
      rowHeight={() => 28} // TODO
      width={width}
      height={height}
      columnWidth={idx =>
        idx === 0 && hasSelectionColumn
          ? columnWidths.selectionColumn
          : columnWidths.dataColumns[idx - indexFirstDataColumn]
      }
    >
      {({ columnIndex, rowIndex, style }) => {
        const
          className = classNames(
            classes.tableBodyCell,
            rowIndex % 2 === 1 ? classes.evenRow : ''),

            field =
              hasSelectionColumn && columnIndex === 0
                ? null
                : props.columns[columnIndex - indexFirstDataColumn].field || null,
            
            cellValue =
              hasSelectionColumn && columnIndex === 0 || field == null
                ? null
                : props.data[rowIndex][field]
        
        return (
          hasSelectionColumn && columnIndex === 0
            ? <div style={style} className={
                classNames(className, classes.rowSelectionCell)}>
                  {renderSelectRowCheckbox(
                    props,
                    state,
                    actions,
                    classes,
                    rowIndex
                  )}
              </div> 
            : <div style={style} className={className}>
                {cellValue}
              </div>
        )
      }}
    </VariableSizeGrid>
  )
}

function calculateColumnWidths(
  columns: DataTableProps['columns'],
  hasSelectorColumn: boolean,
  totalWidth: number
): ColumnWidths {
  const
    selectionColumnWidth = hasSelectorColumn ? SELECTION_COLUMN_WIDTH : 0,
    columnCount = columns.length,

    ret = {
      selectionColumn: selectionColumnWidth,
      dataColumns: [] as number[]
    }

    const
      realTotal = totalWidth - selectionColumnWidth,

      ratioTotal = columns.reduce((sum, col) => {
        return sum + (col.width || 100)
      }, 0)

    let sumRealWidths = 0 

    for (let i = 0; i < columnCount; ++i) {
      const
        column = columns[i],
  
        realWidth =
          i < columnCount - 1
            ? Math.round((column.width || 100) * realTotal / ratioTotal)
            : realTotal - sumRealWidths - 0.5 // TODO: why -0.5?

      sumRealWidths += realWidth

      ret.dataColumns.push(realWidth)
    }

    return ret
}

function renderSelectRowCheckbox(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions,
  classes: DataTableClasses,
  rowIndex: number
) {
  const
    item: Item =  props.data[rowIndex],
    checked = state.selectedItems.has(item)

  return (
    <Checkbox
      checked={checked}

      onChange={
        () => {
          checked
            ? actions.unselectItems([item])
            : actions.selectItems([item])
        }
      }

      checkmarkIconProps={{
        iconName: 'jsc:checkmark'
      }}
    />
  )
}

// --- actions -------------------------------------------------------

function initDataTableState(): DataTableState {
  return {
    selectedItems: new Set<any>(), // TODO
  }
}

const useDataTableActions = defineActions(update => ({
  selectItems(state, items: Item[]) {
    const selectedItems = new Set(state.selectedItems)
    
    items.forEach(item => selectedItems.add(item))
    update({ selectedItems })
  },
  
  unselectItems(state, items: Item[]) {
    const selectedItems = new Set(state.selectedItems)
    
    items.forEach(item => selectedItems.delete(item))
    update({ selectedItems })
  },

  unselectAllItems(state) {
    update({ selectedItems: new Set() })
  }
}), initDataTableState)

// --- exports -------------------------------------------------------

export default DataTable
