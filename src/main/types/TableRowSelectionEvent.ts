import Rec from './Rec'

type TableRowSelectionEvent = {
  type: 'tableRowSelection',
  selection: Set<Rec>
}

export default TableRowSelectionEvent
