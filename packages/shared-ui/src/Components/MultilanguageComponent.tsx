// import * as i18n from 'i18next'
import * as i18n from 'i18next'
import * as React from 'react'

class MultilanguageComponent<Props = {}, State = {}> extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.onLanguageChange = this.onLanguageChange.bind(this)
  }

  public componentDidMount() {
    i18n.on('languageChanged', this.onLanguageChange)
  }

  public componentWillUnmount() {
    i18n.off('languageChanged', this.onLanguageChange)
  }

  private onLanguageChange() {
    this.forceUpdate()
  }
}

export default MultilanguageComponent
