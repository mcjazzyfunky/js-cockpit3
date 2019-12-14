import React from 'react'
import { App, DataExplorer } from '../js-cockpit'

export default {
  title: 'Data driven components'
}

export const dataExplorer = () => (
  <App>
    <DataExplorer
      title="Contacts"
    />
  </App>
)