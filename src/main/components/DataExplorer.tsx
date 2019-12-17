// external imports
import React, { ReactElement, ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { ActionButton } from 'office-ui-fabric-react'

// internal imports
import defineStyles from '../tools/defineStyles'
import defineActions from '../tools/defineActions'
import DataTable from './DataTable'
import Paginator from './Paginator'
import PageSizeSelector from './PageSizeSelector'
import PaginationInfo from './PaginationInfo'

// derived imports
const { useCallback, useEffect, useState } = React

// --- public components ---------------------------------------------

const DataExplorer = component<DataExplorerProps>({
  displayName: 'DataExplorer',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataExplorerProps) }
    : null,
  
    render: DataExplorerView
})

// --- types ---------------------------------------------------------

type DataExplorerProps = {
  title?: string,
   actions:
    (DataExplorerGeneralAction
      | DataExplorerSingleRowAction
      | DataExplorerMultiRowAction)[],

  slotFiltering?: ReactNode
}

type DataExplorerState = {
}

type DataExplorerSingleRowAction = {
  type: 'singleRow',
  text: string,
  icon?: ReactElement
}

type DataExplorerMultiRowAction = {
  type: 'multiRow',
  text: string,
  icon?: ReactElement
}

type DataExplorerGeneralAction = {
  type: 'general',
  text: string,
  icon?: ReactElement
}

type DataExplorerActions = ReturnType<typeof useDataExplorerActions>[0]
type DataExplorerClasses = ReturnType<typeof useDataExplorerStyles>

// --- validation ----------------------------------------------------

const validateDataExplorerProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    slotFiltering: isNode
  }
})

// --- styles --------------------------------------------------------

const useDataExplorerStyles = defineStyles(theme => {
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
      padding: '4px 10px',
    },

    body: {
      flexGrow: 1,
      position: 'relative',
    },

    footer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      padding: '1px 5px 0 5px',
      margin: '0 0 -3px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralQuaternaryAlt,
      borderWidth: '.5px 0 0 0',
    },

    title: {
      fontFamily: theme.fonts.large.fontFamily,
      fontSize: theme.fonts.large.fontSize,
      fontWeight: 400,
      padding: '3px 4px',
      margin: '0 28px 0 0',
    },

    actionButtons: {
    },

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
          backgroundColor: theme.palette.neutralQuaternary,
        }
      }
    },

    actionIcons: {
      //color: theme.palette.themePrimary
    },

    filtering: {
      padding: '0.5em 1em 0.8em 1em',
    }
  }
})

// --- views ---------------------------------------------------------

function DataExplorerView(
  props: DataExplorerProps
) {
  const
    [actions, state] = useDataExplorerActions(),
    classes = useDataExplorerStyles(),
    
    filtering = !props.slotFiltering
      ? null
      : <div className={classes.filtering}>
          {props.slotFiltering}
        </div>


  return (
    <div className={classes.root}>
      {renderHeader(props, state, actions, classes, 2)} // TODO
      {filtering}
      {renderBody(classes)}
      {renderFooter(classes)}
    </div>
  )
}

function renderHeader(
  props: DataExplorerProps,
  state: DataExplorerState,
  actions: DataExplorerActions,
  classes: DataExplorerClasses,
  numSelectedRows: number
) {
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        {props.title}
      </div>
      <div className={classes.actionButtons}>
        {renderActionButtons(props, state, actions, classes, numSelectedRows)}
      </div>
    </div>
  ) 
}

function renderActionButtons(
  props: DataExplorerProps,
  state: DataExplorerState,
  actions: DataExplorerActions,
  classes: DataExplorerClasses,
  numSelectedRows: number
) {
  const buttons: ReactNode[] = []

  props.actions.forEach((action, idx) => {
    const
      disabled =
        action.type === 'singleRow' && numSelectedRows !== 1
            || action.type === 'multiRow' && numSelectedRows === 0

    /*
    if (idx > 0) {
      items.push({
        key: `separator-${idx}`,
        onRender: () => <div className={classes.actionButtonSeparator}></div>
      })
    }
    */

    const
      hasIcon = !!action.icon,
      iconProps = hasIcon ? { iconName: 'icon' } : null,

      actionButtonClassName = classes.actionButton, // TODO

      onRenderIcon = !action.icon
        ? undefined
        : () => action.icon as JSX.Element,

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
        {action.text}
      </ActionButton>)
    
    
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

function renderBody(classes: DataExplorerClasses) {
  return (
    <div className={classes.body}>
      <DataTable
        title="Contacts"
        rowSelectionMode="multi"
        sortField="lastName"
        sortDirection="asc"
        onTableRowSelection={ev => console.log('selection', ev)}
        onTableSort={ev => console.log('table sort', ev)}
        columns={[
          {
            title: 'First name',
            field: 'firstName',
            width: 50,
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
      
        data={[{
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          city: 'London'
        }, {
          id: 2,
          firstName: 'John',
          lastName: 'Smith',
          city: 'Brighton'
        }, {
          id: 3,
          firstName: 'Mary',
          lastName: 'Mason',
          city: 'Bristol'
        }, {
          id: 4,
          firstName: 'Jane',
          lastName: 'Doe',
          city: 'London'
        }, {
          id: 5,
          firstName: 'Mary',
          lastName: 'Mason',
          city: 'Bristol'
        }]}
      />
    </div>
  ) 
}

function renderFooter(classes: DataExplorerClasses) {
  return (
    <div className={classes.footer}>
      <Paginator
        pageIndex={1}
        pageCount={143}
        disabled={false}
      />
      <PageSizeSelector
        pageSize={50}
        disabled={false}
      />
      <PaginationInfo
        about="items"
      />
    </div>
  )
}

// --- actions -------------------------------------------------------

function initDataExplorerState(): DataExplorerState {
  return {}
}

const useDataExplorerActions = defineActions(update => {
  return {

  }
}, initDataExplorerState)

// --- exports -------------------------------------------------------

export default DataExplorer
