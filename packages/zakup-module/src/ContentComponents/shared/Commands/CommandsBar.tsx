import { ClickParam } from 'antd/lib/menu'
import React from 'react'
import { createApiClient } from '../../../utils'
import { CommandItem } from './CommandItem'
import CommandsList from './CommandsList'

type Props = {
  entity: string
  onCommandClick: (commandId: string, isReport: boolean) => any
  disabledActions: boolean
  disabledReports: boolean
}

type State = {
  items: CommandItem[]
  fetched: boolean
}

class CommandsBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      items: [],
      fetched: false,
    }
  }

  public componentDidMount() {
    createApiClient()
      .getCommands(this.props.entity)
      .then(resp => {
        this.setState({
          items: resp.data as CommandItem[],
          fetched: true,
        })
      })
  }

  public handleMenuClick = (isReport: boolean) => (param: ClickParam) => {
    this.props.onCommandClick(param.key, isReport)
  }

  public render() {
    const { disabledActions, disabledReports } = this.props

    if (!this.state.fetched) {
      return null
    }

    const actionItems = this.state.items.filter(i => i.commandType.typeDesc === 'Действие')
    const reportItems = this.state.items.filter(i => i.commandType.typeDesc === 'Отчет')

    return (
      <React.Fragment>
        {actionItems.length ? (
          <CommandsList
            name="Действия"
            disabled={disabledActions}
            handleMenuClick={this.handleMenuClick(false)}
            items={actionItems}
          />
        ) : null}
        {reportItems.length ? (
          <CommandsList
            name="Отчеты"
            disabled={disabledReports}
            handleMenuClick={this.handleMenuClick(true)}
            items={reportItems}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default CommandsBar
