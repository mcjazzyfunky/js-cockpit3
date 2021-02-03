// external imports
import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import { VariableSizeGrid } from 'react-window'
import useResizeAware from 'react-resize-aware'
import * as Spec from 'js-spec/validators'
import Color from 'color'

import { Checkbox, Icon } from '@fluentui/react'

// internal imports
import defineStyles from '../tools/defineStyles'
import classNames from '../tools/classNames'
import defineActions from '../tools/defineActions'
import EventHandler from '../types/EventHandler'
import Rec from '../types/Rec'
import TableSortEvent from '../types/TableSortEvent'
import TableRowSelectionEvent from '../types/TableRowSelectionEvent'

// derived imports
const { useEffect, useState } = React

// --- constants -----------------------------------------------------

const SELECTION_COLUMN_WIDTH = 38

// --- types ---------------------------------------------------------

type DataTableProps = {
  title?: string | null

  rowSelectionMode?: 'none' | 'single' | 'multi'

  sortField?: string | null
  sortDirection?: 'asc' | 'desc'

  columns: {
    title: string
    field?: string | null
    align?: 'start' | 'center' | 'end'
    width?: number
    sortable?: boolean
  }[]

  data: Rec[]

  onTableRowSelection?: EventHandler<TableRowSelectionEvent>
  onTableSort?: EventHandler<TableSortEvent>

  ref?: any // TODO
}

type DataTableState = {
  selectedItems: Set<Rec>
}

type DataTableActions = ReturnType<typeof useDataTableActions>[0]
type ColumnWidths = { selectionColumn: number; dataColumns: number[] }

type DataTableClasses = ReturnType<typeof useDataTableStyles>

// --- validation ----------------------------------------------------

const validateDataTableProps = Spec.checkProps({
  optional: {}
})

// --- styles --------------------------------------------------------

const useDataTableStyles = defineStyles((theme) => {
  return {
    root: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    },

    tableContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },

    rowSelectionColumn: {},

    tableHead: {
      display: 'flex',
      alignItems: 'center',
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
        }
      }
    },

    tableHeadCellSortable: {
      cursor: 'pointer',

      selectors: {
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
      alignItems: 'center',
      flexWrap: 'nowrap'
    },

    tableBodyCell: {
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: theme.fonts.medium.fontSize,
      padding: '3px 8px',
      boxSizing: 'border-box'
    },

    unselectedOddRow: {
      backgroundColor: theme.palette.white
    },

    unselectedEvenRow: {
      backgroundColor: Color(theme.palette.white).darken(0.03) // TODO
    },

    selectedOddRow: {
      backgroundColor: theme.palette.themeLight
    },

    selectedEvenRow: {
      backgroundColor: Color(theme.palette.themeLight).darken(0.08) // TODO
    },

    allRowsSelectionCell: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1px 0 0 9px'
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

// --- components ----------------------------------------------------

function DataTable(props: DataTableProps) {
  const [actions, state] = useDataTableActions(),
    classes = useDataTableStyles(),
    [selectedRows] = useState(() => new Set<any>()), // TODO
    [resizeListener, size] = useResizeAware(),
    tableSizeIsKnown = size.width !== null,
    columnWidths = tableSizeIsKnown
      ? calculateColumnWidths(
          props.columns,
          props.rowSelectionMode !== 'none',
          size.width
        )
      : null,
    tableHead = !tableSizeIsKnown
      ? null
      : renderHead(props, state, actions, classes, columnWidths),
    table = !tableSizeIsKnown
      ? null
      : renderTableBody(props, state, actions, classes, size.width, size.height)

  useEffect(() => {
    actions.unselectAllItems()
  }, [props.data, actions]) // `actions` is only added to satisfy linter

  useEffect(() => {
    props.onTableRowSelection &&
      props.onTableRowSelection({
        type: 'tableRowSelection',
        selection: state.selectedItems
      })
  }, [state.selectedItems])

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

Object.assign(DataTable, {
  displayName: 'DataTable',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateDataTableProps))
})

function renderHead(
  props: DataTableProps,
  state: DataTableState,
  actions: DataTableActions,
  classes: DataTableClasses,
  columnWidths: ColumnWidths | null
) {
  const minWidth = columnWidths
      ? columnWidths.selectionColumn
      : SELECTION_COLUMN_WIDTH + 'px',
    selectionColumn =
      props.rowSelectionMode !== 'single' &&
      props.rowSelectionMode !== 'multi' ? null : (
        <div
          className={classes.rowSelectionColumn}
          style={{
            minWidth
          }}
        >
          <div className={classes.allRowsSelectionCell}>
            {props.rowSelectionMode === 'multi'
              ? renderSelectAllRowsCheckbox(props, state, actions, classes)
              : null}
          </div>
        </div>
      )

  return (
    <div className={classes.tableHead}>
      {selectionColumn}
      {props.columns.map((column, columnIdx) =>
        renderTableHeadCell(
          props,
          state,
          actions,
          classes,
          columnIdx,
          columnWidths
        )
      )}
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
  const column = props.columns[columnIdx],
    isSortable = props.columns[columnIdx].sortable && !!column.field,
    isSorted = !!props.sortField && props.sortField === column.field,
    width = !columnWidths ? '' : columnWidths.dataColumns[columnIdx],
    className = classNames(
      classes.tableHeadCell,
      isSortable ? classes.tableHeadCellSortable : null
    ),
    sortIcon =
      isSortable && isSorted ? (
        props.sortDirection === 'asc' ? (
          <Icon iconName="jsc:up" />
        ) : (
          <Icon iconName="jsc:down" />
        )
      ) : null,
    // TODO - ugly, has to be fixed
    onClick = !isSortable
      ? null
      : () => {
          props.onTableSort &&
            props.onTableSort({
              type: 'tableSort',
              sortField: column.field!,

              sortDirection:
                props.sortField === column.field &&
                props.sortDirection === 'asc'
                  ? 'desc'
                  : 'asc'
            })
        }

  return (
    <div
      key={columnIdx}
      data-sortable={String(isSortable)}
      onClick={onClick || undefined}
      style={{ width, minWidth: width, maxWidth: width }}
      className={className}
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
) {
  // TODO
  const rowSelectionSize = state.selectedItems.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === props.data.length

  return (
    <Checkbox
      checked={checked}
      checkmarkIconProps={{
        iconName: 'jsc:checkmark'
      }}
      onChange={() =>
        checked ? actions.unselectAllItems() : actions.selectItems(props.data)
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
  height: number
) {
  const hasSelectionColumn =
      props.rowSelectionMode === 'single' || props.rowSelectionMode === 'multi',
    indexFirstDataColumn = Number(hasSelectionColumn),
    columnWidths = calculateColumnWidths(
      props.columns,
      hasSelectionColumn,
      width
    )

  return (
    <VariableSizeGrid
      key={Math.random()} // TODO
      columnCount={props.columns.length + indexFirstDataColumn}
      rowCount={props.data.length}
      rowHeight={() => 28} // TODO
      width={width}
      height={height}
      columnWidth={(idx) =>
        idx === 0 && hasSelectionColumn
          ? columnWidths.selectionColumn
          : columnWidths.dataColumns[idx - indexFirstDataColumn]
      }
    >
      {({ columnIndex, rowIndex, style }) => {
        const item = props.data[rowIndex],
          isSelectedRow = state.selectedItems.has(item),
          isEvenRow = rowIndex % 2 === 1,
          className = classNames(
            classes.tableBodyCell,
            !isSelectedRow && !isEvenRow ? classes.unselectedOddRow : '',
            !isSelectedRow && isEvenRow ? classes.unselectedEvenRow : '',
            isSelectedRow && !isEvenRow ? classes.selectedOddRow : '',
            isSelectedRow && isEvenRow ? classes.selectedEvenRow : ''
          ),
          field =
            hasSelectionColumn && columnIndex === 0
              ? null
              : props.columns[columnIndex - indexFirstDataColumn].field || null,
          cellValue =
            (hasSelectionColumn && columnIndex === 0) || field == null
              ? null
              : props.data[rowIndex][field]

        return hasSelectionColumn && columnIndex === 0 ? (
          <div
            style={style}
            className={classNames(className, classes.rowSelectionCell)}
          >
            {renderSelectRowCheckbox(props, state, actions, classes, rowIndex)}
          </div>
        ) : (
          <div style={style} className={className}>
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
  const selectionColumnWidth = hasSelectorColumn ? SELECTION_COLUMN_WIDTH : 0,
    columnCount = columns.length,
    ret = {
      selectionColumn: selectionColumnWidth,
      dataColumns: [] as number[]
    }

  const realTotal = totalWidth - selectionColumnWidth,
    ratioTotal = columns.reduce((sum, col) => {
      return sum + (col.width || 100)
    }, 0)

  let sumRealWidths = 0

  for (let i = 0; i < columnCount; ++i) {
    const column = columns[i],
      realWidth =
        i < columnCount - 1
          ? Math.round(((column.width || 100) * realTotal) / ratioTotal)
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
  const item: Rec = props.data[rowIndex],
    checked = state.selectedItems.has(item)

  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        checked ? actions.unselectItems([item]) : actions.selectItems([item])
      }}
      checkmarkIconProps={{
        iconName: 'jsc:checkmark'
      }}
    />
  )
}

// --- actions -------------------------------------------------------

function initDataTableState(): DataTableState {
  return {
    selectedItems: new Set<Rec>()
  }
}

const useDataTableActions = defineActions(
  (update) => ({
    selectItems(state, items: Rec[]) {
      const selectedItems = new Set(state.selectedItems)

      items.forEach((item) => selectedItems.add(item))
      update({ selectedItems })
    },

    unselectItems(state, items: Rec[]) {
      const selectedItems = new Set(state.selectedItems)

      items.forEach((item) => selectedItems.delete(item))
      update({ selectedItems })
    },

    unselectAllItems(state) {
      update({ selectedItems: new Set() })
    }
  }),
  initDataTableState
)

// --- exports -------------------------------------------------------

export default DataTable
