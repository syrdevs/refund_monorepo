import { Button, message, Tabs } from 'antd'
import * as React from 'react'
import { ProtocolForList } from '../../Entities/Protocol'
import { createApiClient } from '../../utils'
import { ContentLayout } from '../shared'
import ButtonsContainer from '../shared/ButtonsContainer'
import ProtocolActivitiesTable from './ProtocolActivitiesTable'
import ProtocolInfo from './ProtocolInfo'
const TabPane = Tabs.TabPane

type CompProps = {
  match: any
}

type CompState = {
  protocolInfo?: ProtocolForList
  fetched: boolean
}

class Protocol extends React.Component<CompProps, CompState> {
  constructor(props: CompProps) {
    super(props)

    this.state = {
      protocolInfo: undefined,
      fetched: false,
    }
  }

  public componentDidMount() {
    const id = this.props.match.params.id
    this.fetchProtocol(id)
  }

  public render() {
    const { fetched, protocolInfo } = this.state
    const { match } = this.props

    if (!fetched) {
      return <ContentLayout contentName="Протокол" />
    }

    const id = match.params.id
    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'protocols',
        breadcrumbName: 'Все протоколы',
      },
      {
        path: id,
        breadcrumbName: 'Протокол',
      },
    ]

    const header = `Протокол №${protocolInfo!.number} от ${protocolInfo!.documentDate}. Регион: ${
      protocolInfo!.region!.nameRu
    }`
    return (
      <ContentLayout
        contentName={header}
        breadcrumbRoutes={bcRoutes}
        entity="planProtocol"
        disableCommands={false}
        showCommands={true}
        onCommandClick={this.onCommandClick}
      >
        <Tabs tabPosition="left" size="small">
          <TabPane tab="Титульная часть" key="1">
            <ProtocolInfo {...this.state.protocolInfo} />
            <ButtonsContainer toRight={true}>
              <Button
                type="primary"
                htmlType="button"
                disabled={!!this.state.protocolInfo!.documentStatus}
                onClick={() => this.onPublish(id)}
              >
                Опубликовать
              </Button>
            </ButtonsContainer>
          </TabPane>
          <TabPane tab="Спецификация" key="2">
            <ProtocolActivitiesTable planProtocolId={id} />
          </TabPane>
        </Tabs>
      </ContentLayout>
    )
  }

  private onCommandClick = (commandId: string, isReport: boolean) => {
    createApiClient().runCommand(commandId, [this.props.match.params.id], isReport)
  }

  private onPublish = (id: string) => {
    createApiClient()
      .publishProtocol(id)
      .then(() => {
        message.success('Протокол опубликован!')
      })
      .catch(error => message.error(error.response && error.response.data && error.response.data.Message))
  }

  private fetchProtocol = (id: string) => {
    createApiClient()
      .fetchProtocolById(id)
      .then(resp => {
        this.setState({
          protocolInfo: resp.data as ProtocolForList,
          fetched: true,
        })
      })
      .catch(error => message.error(error.message))
  }
}

export default Protocol
