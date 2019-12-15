// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { GoPlus as NewIcon } from 'react-icons/go'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { FiTrash as DeleteIcon } from 'react-icons/fi'
import { MdFileDownload as DownloadIcon } from 'react-icons/md'

import { ActionButton, PrimaryButton } from 'office-ui-fabric-react'

// internal imports
import defineStyles from '../tools/defineStyles'
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
  slotFiltering?: ReactNode
}

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

    actionIcons: {
      //color: theme.palette.themePrimary
    },

    filtering: {
      padding: '0.5em 1em 0.8em 1em',
    }
  }
})

// --- views ---------------------------------------------------------

function DataExplorerView({
  title,
  slotFiltering
}: DataExplorerProps) {
  const
    classes = useDataExplorerStyles(),
    
    filtering = !slotFiltering
      ? null
      : <div className={classes.filtering}>
          {slotFiltering}
        </div>


  return (
    <div className={classes.root}>
      {renderHeader(title, classes)}
      {filtering}
      {renderBody(classes)}
      {renderFooter(classes)}
    </div>
  )
}

function renderHeader(
  title: string | undefined,
  classes: DataExplorerClasses
) {
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.actionButtons}>
        <ActionButton
          onRenderIcon={() =>
            <div className={classes.actionIcons}>
              <NewIcon/>
            </div>
         }>New</ActionButton>
        <ActionButton
          onRenderIcon={() =>
            <div className={classes.actionIcons}>
              <EditIcon/>
            </div>
        }>Edit</ActionButton>
        <ActionButton
          onRenderIcon={() =>
            <div className={classes.actionIcons}>
              <DeleteIcon/>
            </div>
        }>Delete</ActionButton>
        <ActionButton
          onRenderIcon={() =>
            <div className={classes.actionIcons}>
              <DownloadIcon/>
            </div>
         }>Export</ActionButton>
      </div>
    </div>
  ) 
}

function renderBody(classes: DataExplorerClasses) {
  return (
    <div className={classes.body}>
      <DataTable
        title="Contacts"
        rowSelectionMode="multi"
        columns={[
          {
            title: 'Column1',
            width: 50,
          },
          {
            title: 'Column2',
            width: 200
          },
          {
            title: 'Column3'
          }
        ]}
      
        data={[]}
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

// --- exports -------------------------------------------------------

export default DataExplorer
