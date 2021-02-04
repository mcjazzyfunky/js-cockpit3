import Rec from '../data/Rec'

type TableRowSelectionEvent = {
  type: 'tableRowSelection'
  selection: Set<Rec>
}

export default TableRowSelectionEvent
