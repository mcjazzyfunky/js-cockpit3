// components
export { default as App } from './components/App'
export { default as Brand } from './components/Brand'
export { default as CheckBox} from './components/CheckBox'
export { default as CheckBoxGroup } from './components/CheckBoxGroup'
export { default as Cockpit } from './components/Cockpit'
export { default as DataExplorer } from './components/DataExplorer'
export { default as DataForm } from './components/DataForm'
export { default as DateInput } from './components/DateInput'
export { default as FormSection } from './components/FormSection'
export { default as Fieldset } from './components/Fieldset'
export { default as FilterBox } from './components/FilterBox'
export { default as LoginScreen } from './components/LoginScreen'
export { default as LogoutButton } from './components/LogoutButton'
export { default as MenuBar } from './components/MenuBar'
export { default as PasswordInput } from './components/PasswordInput'
export { default as RadioButtonGroup } from './components/RadioButtonGroup'
export { default as SelectBox } from './components/SelectBox'
export { default as SideMenu } from './components/SideMenu'
export { default as TabBox } from './components/TabBox'
export { default as TabPage } from './components/TabPage'
export { default as Text } from './components/Text'
export { default as TextInput } from './components/TextInput'
export { default as UserMenu } from './components/UserMenu'
export { default as WorkspaceSelector } from './components/WorkspaceSelector'

// hoks
export { default as useAdvancedFormCtrl } from './hooks/useAdvancedFormCtrl'
export { default as useFormMgmt } from './hooks/useFormMgmt'
export { default as useDefaultLabelPosition } from './hooks/useDefaultLabelPosition'

// tools
export { default as classNames } from './tools/classNames'
export { default as defineStyles } from './tools/defineStyles'
export { default as loadThemeByName } from './tools/loadThemeByName'

// enums
export { default as LabelPosition } from './enums/LabelPosition'

// register general icons
import React from 'react'
import { registerIcons } from 'office-ui-fabric-react'
import ChevronDownIcon from './icons/ChevronDownIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'

const h = React.createElement

registerIcons({
    icons: {
      'jsc:chevronDown': h(ChevronDownIcon),
      'jsc:chevronRight': h(ChevronRightIcon)
    }
})
