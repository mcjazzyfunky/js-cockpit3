// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { VariableSizeGrid } from 'react-window'
import useResizeAware from 'react-resize-aware'
import * as Spec from 'js-spec/validators'

import { Checkbox } from 'baseui/checkbox'

// internal imports
import defineBaseUIStyles from '../tools/defineBaseUIStyles'
import classNames from '../tools/classNames'

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

  data: object[],

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void,

  ref?: any // TODO
}

type RowSelectionChangeEvent = any // TODO
type SortChangeEvent = any // TODO

type Classes = ReturnType<typeof useDataTableStyles>

// --- validation ----------------------------------------------------

const validateDataTableProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDataTableStyles = defineBaseUIStyles(theme => {
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
      ...theme.borders.border500,
    },
  
    tableHeadCell: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
      borderColor: theme.borders.border500.borderColor,
      borderStyle: 'solid',
      borderWidth: '0 0 0 1px',
      ...theme.typography.font200,
      fontSize: '14px',
      fontWeight: 500,
      borderSizing: 'border-box',

     ':first-child': {
        borderWidth: 0
      }
    },

    tableHeadCellContent: {
      display: 'flex',
      flexWrap: 'nowrap'
    },

    tableBodyCell: {
      ...theme.typography.font200,
      padding: '3px 8px',
      boxSizing: 'border-box'
    },

    evenRow: {
      backgroundColor: theme.colors.mono200
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

function DataTableView({
  columns,
  sortBy,
  sortDir,
  rowSelectionMode,
  data,
}: DataTableProps) {
  const
    classes = useDataTableStyles(),
    [selectedRows] = useState(() => new Set<any>()), // TODO
    [resizeListener, size] = useResizeAware(),
    tableSizeIsKnown = size.width !== null,

    columnWidths = tableSizeIsKnown
       ? calculateColumnWidths(columns, rowSelectionMode !== 'none', size.width)
       : null,

    changeSelection =() => {}, // TODO,
    changeSort = () => {}, // TODO,

    tableHead = !tableSizeIsKnown
      ? null
      : renderHead(
        columns,
        sortBy,
        sortDir,
        rowSelectionMode,
        data,
        selectedRows,
        columnWidths,
        classes,
        changeSelection,
        changeSort
      ),

    table = !tableSizeIsKnown
      ? null
      : renderTableBody(
          columns,
          rowSelectionMode,
          size.width,
          size.height,
          classes
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

function renderTableBody(
  columns: DataTableProps['columns'],
  rowSelectionMode: DataTableProps['rowSelectionMode'],
  width: number,
  height: number,
  classes: Classes
) {
  const
    hasSelectorColumn =
      rowSelectionMode === 'single' || rowSelectionMode === 'multi', 
    
    columnWidths = calculateColumnWidths(columns, hasSelectorColumn, width)

  return (
    <VariableSizeGrid key={Math.random()}
      
      columnCount={columns.length + Number(hasSelectorColumn)}
      rowCount={1000} // TODO
      rowHeight={() => 28} // TODO
      width={width}
      height={height}
      columnWidth={idx =>
        idx === 0 && hasSelectorColumn
          ? columnWidths.selectorColumn
          : columnWidths.dataColumns[idx - Number(hasSelectorColumn)]
      }
    >
      {({ columnIndex, rowIndex, style }) => {
        const className = classNames(
          classes.tableBodyCell,
          rowIndex % 2 === 1 ? classes.evenRow : '')
        
        return (
          hasSelectorColumn && columnIndex === 0
          ? <div style={style} className={classNames(className, classes.rowSelectionCell)}>{renderSelectRowCheckbox()}</div> 
          : <div style={style} className={className}>
              row {rowIndex}, column {columnIndex}
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
) {
  const
    selectorColumnWidth = hasSelectorColumn ? SELECTION_COLUMN_WIDTH : 0,
    columnCount = columns.length,

    ret = {
      selectorColumn: selectorColumnWidth,
      dataColumns: [] as number[]
    }

    const
      realTotal = totalWidth - selectorColumnWidth,

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

function renderHead(
  columns: DataTableProps['columns'],
  sortBy: DataTableProps['sortBy'],
  sortDir: DataTableProps['sortDir'],
  rowSelectionMode: DataTableProps['rowSelectionMode'],
  data: DataTableProps['data'],
  selectedRows: Set<number>,
  columnWidths: ReturnType<typeof calculateColumnWidths> | null, 
  classes: Classes,
  changeSelection: (selection: any) => void,
  changeSort: (field: string, sortDesc: boolean) => void
) { // TODO
  const
    minWidth = columnWidths
      ? columnWidths.selectorColumn
      : SELECTION_COLUMN_WIDTH + 'px',

    selectionColumn =
      rowSelectionMode !== 'single' && rowSelectionMode !== 'multi'
        ? null
        : <div className={classes.rowSelectionColumn} style={{
            minWidth
          }}>
            <div className={classes.allRowsSelectionCell}>
              {
                rowSelectionMode === 'multi'
                  ? renderSelectAllRowsCheckbox(
                    data, selectedRows, changeSelection, classes)
                  : null
              }
            </div>
          </div>

  return (
    <div className={classes.tableHead}>
      {selectionColumn}
      {
        columns.map((column, columnIdx) =>
          renderTableHeadCell(
            columnIdx, columns, sortBy, sortDir,
            
            columnWidths
              ? columnWidths.dataColumns[columnIdx]
              : 10, // TODO
              
            classes, changeSort))
      }
    </div>
  )
}

function renderTableHeadCell(
  columnIdx: number,
  columns: DataTableProps['columns'],
  sortBy: DataTableProps['sortBy'],
  sortDir: DataTableProps['sortDir'],
  width: number,
  classes: Classes,
  changeSort: (field: string, sortDesc: boolean) => void
) {
  const
    column = columns[columnIdx],
    sortable = columns[columnIdx].sortable,
    isSorted = sortBy !== null && sortBy === column.field,

    sortIcon = // TODO
      <div style={{ width: '20px', height: '20px' }}>
        {
          sortable && isSorted
            ? (sortDir === 'asc' ? '(asc)' : '(desc)') // TODO
            : null
        }
      </div>,

    onClick = 
      !sortable && column.field
        ? null
        : () => {
          changeSort(column.field!, isSorted ? sortDir !== 'desc' : false)
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
  data: DataTableProps['data'],
  selectedRows: Set<number>,
  changeRowSelection: (selection: Set<number>) => void,
  classes: Classes
) { // TODO
  const
    rowSelectionSize = selectedRows.size,
    checked = rowSelectionSize > 0 && rowSelectionSize === data.length,

    onChange =() => {
      const selectedRows: Iterable<number> =
        checked
          ? []
          : data.keys()

      changeRowSelection(new Set(selectedRows))
    }

  return (
    <Checkbox/> // TODO
  )
}

function renderSelectRowCheckbox() {
  return <Checkbox/>
}


// --- exports -------------------------------------------------------

export default DataTable
