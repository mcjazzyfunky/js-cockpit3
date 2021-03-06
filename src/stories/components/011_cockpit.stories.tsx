import React from 'react'
import {
  ActionBar,
  App,
  WorkspaceSelector,
  Brand,
  CheckBoxGroup,
  Cockpit,
  DataExplorer,
  DataForm,
  DateInput,
  FormSection,
  Fieldset,
  FilterBox,
  MenuBar,
  RadioButtonGroup,
  Tabs,
  Tab,
  TextInput,
  SelectBox,
  SideMenu,
  UserMenu,
  DefaultTheme,
  ClassicTheme,
  BlueTheme,
  BlueGreenTheme,
  OrangeTheme,
  GreenTheme,
  VioletTheme,
  TealTheme
} from '../js-cockpit'

import { ITheme } from '@fluentui/react'

import { FiSave as SaveIcon } from 'react-icons/fi'
import { FiSave as EditIcon } from 'react-icons/fi'
import { FiSave as NewIcon } from 'react-icons/fi'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { FiPrinter as PrintIcon } from 'react-icons/fi'

export default {
  title: 'Cockpit - Themes'
}

const menuBar = (
  <MenuBar
    items={[
      {
        id: '1',
        type: 'menu',
        text: 'Menu-1',

        items: [
          {
            id: '1-1',
            type: 'item',
            text: 'Item-1-1'
          },
          {
            id: '1-2',
            type: 'item',
            text: 'Item-1-2'
          },
          {
            id: '1-3',
            type: 'item',
            text: 'Item-1-2'
          },
          {
            type: 'divider'
          },
          {
            id: '1-4',
            type: 'item',
            text: 'Item-1-2'
          },
          {
            id: '1-5',
            type: 'item',
            text: 'Item-1-2'
          }
        ]
      },
      {
        id: '2',
        type: 'menu',
        text: 'Menu-2',

        items: [
          {
            id: '2-1',
            type: 'item',
            text: 'Item-2-1'
          },
          {
            id: '2-2',
            type: 'item',
            text: 'Item-2-2'
          },
          {
            id: '2-3',
            type: 'item',
            text: 'Item-2-3'
          },
          {
            type: 'divider'
          },
          {
            id: '2-4',
            type: 'item',
            text: 'Item-2-4'
          },
          {
            id: '2-5',
            type: 'menu',
            text: 'Item-2-5',

            items: [
              {
                id: '2-5-1',
                type: 'item',
                text: 'Item 2-5-1'
              }
            ]
          }
        ]
      },
      {
        type: 'menu',
        id: '233',
        text: 'Menu-3',
        items: []
      }
    ]}
  />
)

function renderCockpit(
  theme: ITheme = DefaultTheme,
  look: 'default' | 'bright' = 'default'
) {
  return (
    <Cockpit
      theme={theme}
      look={look}
      slotBrand={
        <Brand
          vendor="meet&amp;greet"
          title="Back Office"
          size="small"
          multicolor={false}
        />
      }
      slotTopNav={
        <WorkspaceSelector
          menu={{
            type: 'items',
            activeItemId: '3',
            items: [
              {
                type: 'item',
                itemId: '1',
                text: 'Dashboard',
                description: 'A easy overview of your business'
              },
              {
                type: 'item',
                itemId: '2',
                text: 'User management',
                description: 'Handle user and user groups'
              },
              {
                type: 'item',
                itemId: '3',
                text: 'Catalog',
                description: 'Manage products and categories'
              },
              {
                type: 'item',
                itemId: '4',
                text: 'CMS',
                description: 'Content management system'
              }
            ]
          }}
        />
      }
      slotActions={<UserMenu displayName="Jane Doe" />}
      //slotMenu={menuBar}

      slotSidebar={
        <SideMenu
          menu={{
            type: 'groups',
            activeItemId: '123',
            groups: [
              {
                type: 'group',
                title: 'Products',
                items: [
                  {
                    type: 'item',
                    title: 'Manage products',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Price calculation',
                    itemId: '123'
                  },
                  {
                    type: 'item',
                    title: 'Import products',
                    itemId: '3'
                  },
                  {
                    type: 'item',
                    title: 'Export products',
                    itemId: '3'
                  }
                ]
              },
              {
                type: 'group',
                title: 'Articles',
                items: [
                  {
                    type: 'item',
                    title: 'Assign articles to products',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Export articles',
                    itemId: '2'
                  }
                ]
              },
              /*
            {
              type: 'group',
              title: 'Articles',
              items: [
                {
                  type: 'group',
                  title: 'Variants',
                  items: [
                    {
                      type: 'item',
                      title: 'Item-2-1',
                      itemId: '1',
                    },
                    {
                      type: 'item',
                      title: 'Item-2-1',
                      itemId: '2'
                    }
                  ]
                },
                {
                  type: 'group',
                  title: 'Services',
                  items: [
                    {
                      type: 'item',
                      title: 'Item-2-1',
                      itemId: '1'
                    },
                    {
                      type: 'item',
                      title: 'Item-2-1',
                      itemId: '2'
                    }
                  ]
                }
              ]
            }*/
              {
                type: 'group',
                title: 'Categories',
                items: [
                  {
                    type: 'item',
                    title: 'Manage categories',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Import categories',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Export categories',
                    itemId: '2'
                  }
                ]
              }
            ]
          }}
        />
      }
      slotCenter={mainContent}
    />
  )
}

const dataExplorer = (
  <DataExplorer
    title="Back-office users"
    actions={[
      {
        type: 'general',
        text: 'New',
        icon: <NewIcon />
      },
      {
        type: 'singleRow',
        text: 'Edit',
        icon: <EditIcon />
      },
      {
        type: 'multiRow',
        text: 'Delete',
        icon: <DeleteIcon />
      }
    ]}
    slotFiltering={
      <FilterBox>
        <Fieldset>
          <TextInput name="firstName" label="First name" />
          <TextInput name="lastName" label="Last name" />
        </Fieldset>
        <Fieldset>
          <TextInput name="postcode" label="Postcode" />
          <TextInput name="city" label="City" />
        </Fieldset>
        <Fieldset>
          <DateInput name="dateFrom" label="Date from" />
          <DateInput name="dateTo" label="Date to" />
        </Fieldset>
      </FilterBox>
    }
  />
)

const dataForm = (
  <DataForm
    title="Products"
    slotActions={
      <ActionBar
        actions={[
          { actionId: 'save', text: 'Save', icon: <SaveIcon /> },
          { actionId: 'delete', text: 'Delete', icon: <DeleteIcon /> },
          { actionId: 'print', text: 'Print', icon: <PrintIcon /> }
        ]}
      />
    }
  >
    <Tabs>
      <Tab title="Customer data">
        <FormSection title="Address">
          <Fieldset title="Primary address">
            <RadioButtonGroup
              name="salutation"
              label="Salutation"
              align="horizontal"
              value="mrs"
              options={[
                { value: 'mrs', text: 'Mrs' },
                { value: 'mr', text: 'Mrs' }
              ]}
            />

            <TextInput name="firstName" label="First name" required />
            <TextInput name="lastName" label="Last name" required />
            <TextInput name="street" label="Street" required />
            <TextInput name="city" label="City" required />

            <SelectBox
              name="country"
              label="Country"
              options={[
                { value: 'US', text: 'USA' },
                { value: 'FR', text: 'France' }
              ]}
            />

            <RadioButtonGroup
              name="newsletter"
              label="Newsletter"
              value="monthly"
              options={[
                { value: 'weekly', text: 'weekly' },
                { value: 'monthly', text: 'monthly' },
                { value: 'never', text: 'never' }
              ]}
            />
          </Fieldset>

          <Fieldset title="Secondary address">
            <TextInput name="firstName" label="First name" required />
            <TextInput name="lastName" label="Last name" required />
            <TextInput name="street" label="Street" required />
            <TextInput name="city" label="City" required />

            <CheckBoxGroup
              label="Inform about"
              name="topics"
              options={[
                { key: 'internalNews', text: 'Internal News' },
                { key: 'externalNews', text: 'Exernal News' },
                { key: 'offers', text: 'Offers' },
                { key: 'changes', text: 'Changes' }
              ]}
            />
          </Fieldset>
        </FormSection>
        <FormSection title="Meta data">
          <Fieldset>
            <TextInput name="firstName" label="First name" required />
            <TextInput name="lastName" label="Last name" required />
            <TextInput name="street" label="Street" required />
            <TextInput name="city" label="City" required />
          </Fieldset>

          <Fieldset>
            <TextInput name="firstName" label="First name" required />
            <TextInput name="lastName" label="Last name" required />
            <TextInput name="street" label="Street" required />
            <TextInput name="city" label="City" required />
          </Fieldset>
        </FormSection>
      </Tab>
      <Tab title="Documents">{dataExplorer}</Tab>
      <Tab title="Images"></Tab>
      <Tab title="Setting"></Tab>
      <Tab title="Permission"></Tab>
    </Tabs>
  </DataForm>
)

/*
const dataForm = 
  <DataForm title="Products">
    <Fieldset>
      <TextInput name="productId" label="Product no."/>
    </Fieldset>
    <Tabs>
      <Tab title="Customer data">
        <div>
          <Fieldset title="Primary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
            <TextInput name="firstName" label="First name" required/>
            <TextInput name="lastName" label="Last name" required/>
            <TextInput name="street" label="Street" required/>
            <TextInput name="city" label="City" required/>
            
            <SelectBox
              name="country"
              label="Country" 
              options={[
                { key: 'FR', text: 'France'},
                { key: 'DE', text: 'Germany'}
              ]}
            />
            <DateInput name="dayOfBirth" label="Day of Birth" required/>

            <CheckBoxGroup
              label="Options"
            />
          </Fieldset>
          <Fieldset title="Secondary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
            <TextInput name="firstName" label="First name" required/>
            <TextInput name="lastName" label="Last name" required/>
            <TextInput name="street" label="Street" required/>
            <TextInput name="city" label="City" required/>
            
            <SelectBox
              name="country"
              label="Country" 
              options={[
                { key: 'FR', text: 'France'},
                { key: 'DE', text: 'Germany'}
              ]}
            />
            <DateInput name="dayOfBirth" label="Day of Birth" required/>
          </Fieldset>
        </div>
        <div>
          <Fieldset title="Secondary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
            <TextInput name="firstName" label="First name" required/>
            <TextInput name="lastName" label="Last name" required/>
            <TextInput name="street" label="Street" required/>
            <TextInput name="city" label="City" required/>
            
            <SelectBox
              name="country"
              label="Country" 
              options={[
                { key: 'FR', text: 'France'},
                { key: 'DE', text: 'Germany'}
              ]}
            />
            <DateInput name="dayOfBirth" label="Day of Birth" required/>
          </Fieldset>
        </div>
      </Tab>
      <Tab title="Documents">
      </Tab>
      <Tab title="Images">
      </Tab>
      <Tab title="Setting">
      </Tab>
      <Tab title="Permission">
      </Tab>
    </Tabs>
  </DataForm>
*/
const mainContent = dataExplorer

export const cockpitDefault = () => renderCockpit(DefaultTheme)
export const cockpitClassic = () => renderCockpit(ClassicTheme)
export const cockpitBlue = () => renderCockpit(BlueTheme)
export const cockpitBlueGreen = () => renderCockpit(BlueGreenTheme)
export const cockpitOrange = () => renderCockpit(OrangeTheme)
export const cockpitGreen = () => renderCockpit(GreenTheme)
export const cockpitViolet = () => renderCockpit(VioletTheme)
export const cockpitTeal = () => renderCockpit(TealTheme)

export const cockpitDefaultBright = () => renderCockpit(DefaultTheme, 'bright')
export const cockpitClassicBright = () => renderCockpit(ClassicTheme, 'bright')
export const cockpitBlueBright = () => renderCockpit(BlueTheme, 'bright')
export const cockpitBlueGreenBright = () =>
  renderCockpit(BlueGreenTheme, 'bright')
export const cockpitOrangeBright = () => renderCockpit(OrangeTheme, 'bright')
export const cockpitGreenBright = () => renderCockpit(GreenTheme, 'bright')
export const cockpitVioletBright = () => renderCockpit(VioletTheme, 'bright')
export const cockpitTealBright = () => renderCockpit(TealTheme, 'bright')
