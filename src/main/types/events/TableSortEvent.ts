type TableSortEvent = {
  type: 'tableSort',
  sortField: string,
  sortDirection: 'asc' | 'desc'
}

export default TableSortEvent
