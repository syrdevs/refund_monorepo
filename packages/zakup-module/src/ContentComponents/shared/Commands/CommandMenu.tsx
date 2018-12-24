import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import React from 'react'
import { CommandItem } from './CommandItem'

type CommandMenuProps = {
  handleMenuClick: (param: ClickParam) => any
  items: CommandItem[]
  disabled: boolean
}

export const CommandMenu = (props: CommandMenuProps) => (
  <Menu style={{ boxShadow: '0 0 4px 0 #cecece' }} onClick={props.handleMenuClick}>
    {props.items.map(i => (
      <Menu.Item disabled={props.disabled} key={i.id}>
        {i.name}
      </Menu.Item>
    ))}
  </Menu>
)
