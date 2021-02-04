// external imports
import React, { ReactElement, ReactNode, Ref } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { ActionButton } from '@fluentui/react'

// internal imports
import defineStyles from '../tools/defineStyles'
import defineActions from '../tools/defineActions'
import DataTable from './DataTable'
import Paginator from './Paginator'
import PageSizeSelector from './PageSizeSelector'
import PaginationInfo from './PaginationInfo'
import useForceUpdate from '../hooks/useForceUpdate'
import Rec from '../types/data/Rec'

// derived imports
const {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} = React

// === types =========================================================

type DataExplorerProps = {
  title?: string
  actions: (
    | DataExplorerGeneralAction
    | DataExplorerSingleRowAction
    | DataExplorerMultiRowAction
  )[]

  slotFiltering?: ReactNode
}

type DataExplorerState = {}

type DataExplorerSingleRowAction = {
  type: 'singleRow'
  text: string
  icon?: ReactElement
}

type DataExplorerMultiRowAction = {
  type: 'multiRow'
  text: string
  icon?: ReactElement
}

type DataExplorerGeneralAction = {
  type: 'general'
  text: string
  icon?: ReactElement
}

type DataExplorerActions = ReturnType<typeof useDataExplorerActions>[0]
type DataExplorerClasses = ReturnType<typeof useDataExplorerStyles>

// === validation ====================================================

const validateDataExplorerProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    slotFiltering: isNode
  }
})

// === styles ========================================================

const useDataExplorerStyles = defineStyles((theme) => {
  return {
    root: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '2px',
      boxSizing: 'border-box'
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      borderWidth: '0 0 .5px 0',
      borderColor: theme.palette.neutralQuaternary,
      borderStyle: 'solid',
      marginBottom: '3px',
      padding: '4px 10px'
    },

    body: {
      flexGrow: 1,
      position: 'relative'
    },

    footer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      padding: '1px 5px 0 5px',
      margin: '0 0 -3px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralQuaternaryAlt,
      borderWidth: '.5px 0 0 0'
    },

    title: {
      fontFamily: theme.fonts.large.fontFamily,
      fontSize: theme.fonts.large.fontSize,
      fontWeight: 400,
      padding: '3px 4px',
      margin: '0 28px 0 0'
    },

    actionButtons: {},

    actionButton: {
      selectors: {
        ':hover': {
          borderRadius: 0,
          color: theme.palette.black,
          backgroundColor: theme.palette.neutralLight
        },

        ':active': {
          borderRadius: 0,
          color: theme.palette.black,
          backgroundColor: theme.palette.neutralQuaternary
        }
      }
    },

    actionIcons: {
      //color: theme.palette.themePrimary
    },

    filtering: {
      padding: '0.5em 1em 0.8em 1em'
    }
  }
})

// === components ====================================================

function DataExplorer(props: DataExplorerProps) {
  const [actions, state] = useDataExplorerActions(),
    classes = useDataExplorerStyles(),
    actionBarRef = useRef<{ forceUpdate: () => void }>(),
    selectedRowsRef = useRef<Set<Rec>>(new Set()),
    getNumSelectedRows = useCallback(() => {
      return selectedRowsRef.current ? selectedRowsRef.current.size : 0
    }, []),
    onSelectionChange = useCallback((selectedRows: Set<Rec>) => {
      selectedRowsRef.current = selectedRows
      actionBarRef.current && actionBarRef.current.forceUpdate()
    }, []),
    filtering = !props.slotFiltering ? null : (
      <div className={classes.filtering}>{props.slotFiltering}</div>
    ),
    actionBar = (
      <ActionBar
        ref={actionBarRef}
        config={props.actions}
        classes={classes}
        actions={actions}
        getNumSelectedRows={getNumSelectedRows}
      />
    )

  return (
    <div className={classes.root}>
      {renderHeader(props, state, actions, classes, actionBar)}
      {filtering}
      {renderBody(classes, onSelectionChange)}
      {renderFooter(classes)}
    </div>
  )
}

Object.assign(DataExplorer, {
  displayName: 'DataExplorer',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateDataExplorerProps))
})

const ActionBar = forwardRef(
  (
    props: {
      config: DataExplorerProps['actions']
      actions: DataExplorerActions
      classes: DataExplorerClasses
      getNumSelectedRows: () => number
    },
    ref: any
  ) => {
    const forceUpdate = useForceUpdate()

    useImperativeHandle(
      ref,
      () => ({
        forceUpdate
      }),
      [forceUpdate]
    )

    return renderActionButtons(
      props.config,
      props.actions,
      props.classes,
      props.getNumSelectedRows()
    )
  }
)

function renderHeader(
  props: DataExplorerProps,
  state: DataExplorerState,
  actions: DataExplorerActions,
  classes: DataExplorerClasses,
  actionBar: ReactNode
) {
  return (
    <div className={classes.header}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.actionButtons}>{actionBar}</div>
    </div>
  )
}

function renderActionButtons(
  config: DataExplorerProps['actions'],
  actions: DataExplorerActions,
  classes: DataExplorerClasses,
  numSelectedRows: number
) {
  const buttons: ReactNode[] = []

  config.forEach((item, idx) => {
    const disabled =
      (item.type === 'singleRow' && numSelectedRows !== 1) ||
      (item.type === 'multiRow' && numSelectedRows === 0)

    /*
    if (idx > 0) {
      items.push({
        key: `separator-${idx}`,
        onmain: () => <div className={classes.actionButtonSeparator}></div>
      })
    }
    */

    const hasIcon = !!item.icon,
      iconProps = hasIcon ? { iconName: 'icon' } : null,
      actionButtonClassName = classes.actionButton, // TODO
      onRenderIcon = !item.icon ? undefined : () => item.icon as JSX.Element,
      // TODO
      //        disabled
      //          ? css(classes.actionButton, classes.actionButtonDisabled)
      //          : classes.actionButton,

      iconClassName = null // TODO

    // TODO
    //      hasIcon
    //          ? (disabled ? classes.actionIconDisabled : classes.actionIcon)
    //          : undefined

    buttons.push(
      <ActionButton disabled={disabled} onRenderIcon={onRenderIcon}>
        {item.text}
      </ActionButton>
    )

    /*
    ({
      key: String(idx),
      text: action.text,
      iconProps,
      disabled,
      className: actionButtonClassName,
      onRenderIcon: action.icon ?
        () => <div className={iconClassName}>{action.icon}</div>
        : undefined
    })
    */
  })

  return <div>{buttons}</div>
}

function renderBody(
  classes: DataExplorerClasses,
  onSelectionChange: any // TODO!!!!!!
) {
  return (
    <div className={classes.body}>
      <DataTable
        title="Contacts"
        rowSelectionMode="multi"
        sortField="lastName"
        sortDirection="asc"
        onTableRowSelection={(ev: any) => onSelectionChange(ev.selection)} // TODO!!!!
        onTableSort={(ev: any) => console.log('table sort', ev)} // TODO
        columns={[
          {
            title: 'First name',
            field: 'firstName',
            width: 50
          },
          {
            title: 'Last name',
            field: 'lastName',
            sortable: true,
            width: 200
          },
          {
            title: 'City',
            field: 'city'
          }
        ]}
        data={[
          {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            city: 'London'
          },
          {
            id: 2,
            firstName: 'John',
            lastName: 'Smith',
            city: 'Brighton'
          },
          {
            id: 3,
            firstName: 'Mary',
            lastName: 'Mason',
            city: 'Bristol'
          },
          {
            id: 4,
            firstName: 'Jane',
            lastName: 'Doe',
            city: 'London'
          },
          {
            id: 5,
            firstName: 'Mary',
            lastName: 'Mason',
            city: 'Bristol'
          }
        ]}
      />
    </div>
  )
}

function renderFooter(classes: DataExplorerClasses) {
  return (
    <div className={classes.footer}>
      <Paginator pageIndex={1} pageCount={143} disabled={false} />
      <PageSizeSelector pageSize={50} disabled={false} />
      <PaginationInfo about="items" />
    </div>
  )
}

// === actions =======================================================
function initDataExplorerState(): DataExplorerState {
  return {}
}

const useDataExplorerActions = defineActions((update) => {
  return {}
}, initDataExplorerState)

// === exports =======================================================

export default DataExplorer
