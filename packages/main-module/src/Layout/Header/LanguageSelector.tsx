import * as React from 'react'
import kzFlag from '../../Images/kzFlag.svg'
import ruFlag from '../../Images/ruFlag.svg'
import { setUserLanguage } from '../../utils'

const languages = [
  {
    name: 'ru',
    label: 'Русский',
    imgSrc: ruFlag,
  },
  {
    name: 'kz',
    label: 'Казахский',
    imgSrc: kzFlag,
  },
]

type Props = {
  defaultLanguage?: string
}

type State = {
  currentLanguage?: string
  selectionOpen: boolean
}

class LanguageSelector extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      currentLanguage: this.props.defaultLanguage,
      selectionOpen: false,
    }

    this.hideSelectOptions = this.hideSelectOptions.bind(this)
  }

  public render() {
    const { currentLanguage, selectionOpen } = this.state
    const currentLanguageObj = currentLanguage && languages.find(lngObj => lngObj.name === currentLanguage)

    return (
      <div className="language-selector" onClick={this.toggleSelectionOpen}>
        <div className="language-selector__bar">
          {(currentLanguageObj && this.renderLanguageItem(currentLanguageObj)) || <p>Язык</p>}
          <p className={`language-selector__arrow ${selectionOpen ? 'opened' : ''}`} />
        </div>
        {selectionOpen && this.renderSelections(currentLanguageObj && currentLanguageObj.name)}
      </div>
    )
  }

  public componentDidMount() {
    window.addEventListener('click', this.hideSelectOptions)
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.hideSelectOptions)
  }

  private toggleSelectionOpen = (evt: React.SyntheticEvent<HTMLDivElement>) => {
    evt.stopPropagation()

    this.setState({
      selectionOpen: !this.state.selectionOpen,
    })
  }

  private hideSelectOptions() {
    if (this.state.selectionOpen) {
      this.setState({
        selectionOpen: false,
      })
    }
  }

  private renderLanguageItem = (currentLanguageObj: { name: string; label: string; imgSrc: any }) => {
    return (
      <div className="language-selector__item">
        <p>{currentLanguageObj.label}</p>
      </div>
    )
  }

  private renderSelections = (currentLanguageName?: string) => {
    return (
      <div className="language-selector__options">
        {languages.map(lngObj => {
          return (
            <div
              className={`language-selector__item ${lngObj.name === currentLanguageName ? 'selected' : ''}`}
              key={lngObj.name}
              onClick={() => this.onSelectFlag(lngObj.name)}
            >
              {lngObj.label}
            </div>
          )
        })}
      </div>
    )
  }

  private onSelectFlag = (countryCode: string) => {
    this.setState({
      selectionOpen: false,
      currentLanguage: countryCode,
    })

    setUserLanguage(countryCode)
  }
}

export default LanguageSelector
