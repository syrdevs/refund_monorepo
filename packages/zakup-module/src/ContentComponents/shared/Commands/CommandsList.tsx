import { Button, Dropdown, Icon } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import React from 'react'
import { CommandItem } from './CommandItem'
import { CommandMenu } from './CommandMenu'

type CommandListProps = {
  name: string
  disabled: boolean
  handleMenuClick: (param: ClickParam) => any
  items: CommandItem[]
}

const CommandsList = (props: CommandListProps) => (
  <Dropdown
    overlay={<CommandMenu disabled={props.disabled} handleMenuClick={props.handleMenuClick} items={props.items} />}
  >
    <Button htmlType="button" style={{ marginLeft: 8 }}>
      {props.name}
      <Icon type="down" />
    </Button>
  </Dropdown>
)

export default CommandsList
