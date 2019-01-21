import { Icon, Layout, Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { ClickParam, SelectParam } from 'antd/lib/menu'
import * as i18n from 'i18next'
import React from 'react'
import { LeftMenuRootNode, LeftMenuRoutableItem } from '../Models/LeftMenu'
import { COLORS } from '../Styling/Typography'
import MultilanguageComponent from './MultilanguageComponent'
const SubMenu = Menu.SubMenu

type PropsType = {
  leftMenuItems: LeftMenuRootNode[]
  location: string
  goToLink: (href: string) => any
}

type StateType = {
  expandedRootNodes: string[]
  currentlyExpandedRootNodes: string[]
  selectedKeys: string[]
  collapsed: boolean
  location: string
}

export class LeftMenu extends MultilanguageComponent<PropsType, StateType> {
  public static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (prevState.location === nextProps.location) {
      return null
    }

    const expandedRootNode = LeftMenu.extractExpandedRootNode(nextProps.location)
    const selectedNode = LeftMenu.extractSelectedNode(nextProps.location)

    return {
      expandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
      currentlyExpandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
      selectedKeys: selectedNode ? [selectedNode] : [],
      location: nextProps.location,
    } as Partial<StateType>
  }
  private static hrefItems: Array<{ rootNodeHref: string; href: string }> = []

  private static getHrefForSubItemNode = (rootNode: LeftMenuRootNode, subItem: LeftMenuRoutableItem) => {
    return `${rootNode.hrefPrefix}${subItem.href}`
  }

  private static getHrefsOfItems = (leftMenuItems: LeftMenuRootNode[]) => {
    const hrefs = []

    for (const rootNode of leftMenuItems) {
      if (rootNode.subItems.length > 0) {
        for (const subItem of rootNode.subItems) {
          const href = LeftMenu.getHrefForSubItemNode(rootNode, subItem)
          hrefs.push({ rootNodeHref: rootNode.hrefPrefix!, href })
        }
      }
      hrefs.push({
        rootNodeHref: rootNode.hrefPrefix!,
        href: rootNode.hrefPrefix!,
      })
    }

    hrefs.sort((a: { rootNodeHref: string; href: string }, b: { rootNodeHref: string; href: string }) => {
      const aParts = a.href.split('/')
      const bParts = b.href.split('/')

      return bParts.length - aParts.length
    })

    return hrefs
  }

  private static extractExpandedRootNode = (location: string) => {
    for (const hrefsObj of LeftMenu.hrefItems) {
      if (location.startsWith(hrefsObj.href)) {
        return hrefsObj.rootNodeHref
      }
    }

    return null
  }

  private static extractSelectedNode = (location: string) => {
    for (const hrefsObj of LeftMenu.hrefItems) {
      if (location.startsWith(hrefsObj.href)) {
        return hrefsObj.href
      }
    }

    return null
  }

  constructor(props: PropsType) {
    super(props)

    LeftMenu.hrefItems = LeftMenu.getHrefsOfItems(props.leftMenuItems)

    const expandedRootNode = LeftMenu.extractExpandedRootNode(props.location)
    const selectedNode = LeftMenu.extractSelectedNode(props.location)

    this.state = {
      expandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
      currentlyExpandedRootNodes: expandedRootNode ? [expandedRootNode] : [],
      selectedKeys: selectedNode ? [selectedNode] : [],
      collapsed: false,
      location: props.location,
    }
  }

  public render() {
    const menuElement = (
      <Layout
        style={{
          minHeight: 'calc(100vh-70px)',
          borderTop: `4px solid ${COLORS.MAIN_BLUE}`,
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light" width={300}>
          <Menu
            mode="inline"
            theme="light"
            onOpenChange={this.toggleNode}
            onSelect={this.onSelect}
            onClick={this.handleMenuOnClick}
            openKeys={this.state.currentlyExpandedRootNodes}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderLeftMenuItems()}
          </Menu>
        </Sider>
      </Layout>
    )

    return menuElement
  }

  private onCollapse = () => {
    const newState = {
      collapsed: !this.state.collapsed,
    } as Partial<StateType>

    if (!this.state.collapsed) {
      newState.currentlyExpandedRootNodes = []
    } else {
      newState.currentlyExpandedRootNodes = this.state.expandedRootNodes
    }

    this.setState(newState as StateType)
  }

  private handleMenuOnClick = (param: ClickParam) => {
    this.goToLink(param.key)
  }

  private goToLink = (href: string) => {
    this.props.goToLink(href)
  }

  private renderRootNode = (rootNode: LeftMenuRootNode) => {
    const hasItems = rootNode.subItems.length > 0

    if (!hasItems) {
      return (
        <Menu.Item key={rootNode.hrefPrefix!}>
          <Icon type={rootNode.iconName} />
          <span>{i18n.t(rootNode.translationKey)}</span>
        </Menu.Item>
      )
    }

    return (
      <SubMenu
        key={rootNode.hrefPrefix!}
        title={
          <span>
            <Icon type={rootNode.iconName} />
            <span>{i18n.t(rootNode.translationKey)}</span>
          </span>
        }
      >
        {rootNode.subItems.map(subItem => {
          const href = LeftMenu.getHrefForSubItemNode(rootNode, subItem)
          return (
            <Menu.Item key={href}>
              <span>{i18n.t(subItem.translationKey)}</span>
            </Menu.Item>
          )
        })}
      </SubMenu>
    )
  }

  private toggleNode = (openKeys: string[]) => {
    const newState = {
      currentlyExpandedRootNodes: [...openKeys],
    } as Partial<StateType>

    if (!this.state.collapsed) {
      newState.expandedRootNodes = [...openKeys]
    }

    this.setState(newState as StateType)
  }

  private onSelect = (param: SelectParam) => {
    const newState = {
      selectedKeys: [...param.selectedKeys],
    } as Partial<StateType>

    if (this.state.collapsed) {
      newState.expandedRootNodes = this.state.currentlyExpandedRootNodes
    }

    this.setState(newState as StateType)
  }

  private renderLeftMenuItems = () => {
    const itemsArr: React.ReactNode[] = []
    const { leftMenuItems } = this.props

    leftMenuItems.forEach(rootNode => {
      itemsArr.push(this.renderRootNode(rootNode))
    })

    return itemsArr
  }
}
