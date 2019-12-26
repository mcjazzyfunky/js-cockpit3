// components
export { default as ActionBar } from './components/ActionBar'
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
export { default as Tabs } from './components/Tabs'
export { default as Tab } from './components/Tab'
export { default as Text } from './components/Text'
export { default as TextInput } from './components/TextInput'
export { default as UserMenu } from './components/UserMenu'
export { default as WorkspaceSelector } from './components/WorkspaceSelector'

// hooks
export { default as useDefaultLabelPosition } from './hooks/useDefaultLabelPosition'
export { default as useForceUpdate } from './hooks/useForceUpdate'
export { default as useTheme } from './hooks/useTheme'

// tools
export { default as classNames } from './tools/classNames'
export { default as defineStyles } from './tools/defineStyles'

// enums
export { default as LabelPosition } from './enums/LabelPosition'

// themes
export { default as DefaultTheme } from './themes/DefaultTheme'
export { default as ClassicTheme } from './themes/ClassicTheme'
export { default as BlueTheme } from './themes/BlueTheme'
export { default as BlueGreenTheme } from './themes/BlueGreenTheme'
export { default as GreenTheme } from './themes/GreenTheme'
export { default as OrangeTheme } from './themes/OrangeTheme'
export { default as VioletTheme } from './themes/VioletTheme'
export { default as TealTheme } from './themes/TealTheme'

// --- register general icons ----------------------------------------

import React from 'react'
import { registerIcons } from 'office-ui-fabric-react'
import CalendarIcon from './icons/CalendarIcon'
import CheckmarkIcon from './icons/CheckmarkIcon'
import ChevronDownIcon from './icons/ChevronDownIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'
import UpIcon from './icons/DownIcon'
import DownIcon from './icons/UpIcon'
import CloseIcon from './icons/CloseIcon'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import ArrowRightIcon from './icons/ArrowRightIcon'
import ArrowDoubleLeftIcon from './icons/ArrowDoubleLeftIcon'
import ArrowDoubleRightIcon from './icons/ArrowDoubleRightIcon'

const h = React.createElement

registerIcons({
  icons: {
    'jsc:calendar': h(CalendarIcon),
    'jsc:checkmark': h(CheckmarkIcon),
    'jsc:chevronDown': h(ChevronDownIcon),
    'jsc:chevronRight': h(ChevronRightIcon),
    'jsc:up': h(UpIcon),
    'jsc:down': h(DownIcon),
    'jsc:close': h(CloseIcon),
    'jsc:arrowLeft': h(ArrowLeftIcon),
    'jsc:arrowRight': h(ArrowRightIcon),
    'jsc:arrowDoubleLeft': h(ArrowDoubleLeftIcon),
    'jsc:arrowDoubleRight': h(ArrowDoubleRightIcon),
  }
}, { disableWarnings: true })
