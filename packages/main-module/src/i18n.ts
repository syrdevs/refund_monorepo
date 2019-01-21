import { KzTranslation, LANGUAGES, RuTranslation } from '@vitacore/shared-ui'
import * as i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import { getUserLanguage } from './utils'

i18n.use(reactI18nextModule).init({
  resources: {
    [LANGUAGES.RU]: RuTranslation,
    [LANGUAGES.KZ]: KzTranslation,
  },
  lng: getUserLanguage(),
  interpolation: {
    escapeValue: false,
  },
})
