declare module '@vitacore/shared-ui'

export { AxiosData, AxiosDataUntyped } from './src/Infrastructure/axiosResponseDataWrapper'
export { ReduxActionType } from './src/Infrastructure/reduxActionType'
export {
  AUTH_TOKEN,
  LANGUAGE,
  LANGUAGES,
  REQUEST_STARTED,
  REQUEST_FINISHED,
  APP_ROUTE_KEY,
} from './src/Infrastructure/globalConstants'
export { AxiosResponseTypeWithData, AxiosResponseType } from './src/Infrastructure/axiosResponseType'
export { ListData } from './src/Models/ListData'
export { COLORS, WEIGHTS, SIZES } from './src/Styling/Typography'
export { PrivateRoute, PrivateRouteProps } from './src/Routing/PrivateRoute'
export { default as NoMatchRoute } from './src/Routing/NoMatchRoute'
export { AppGlobalProps } from './src/Infrastructure/appGlobalProps'
export { buildAppRoute } from './src/Routing/utils'
export { default as KzTranslation } from './src/i18n/kz'
export { default as RuTranslation } from './src/i18n/ru'
export { LeftMenu } from './src/Components/LeftMenu'
export { LeftMenuRootNode, LeftMenuRoutableItem } from './src/Models/LeftMenu'
export { ML } from './src/Models/ML'
export { DictionaryBase, DictionaryBaseML, DictionaryBaseMLWithShortName } from './src/Models/DictionaryBase'
export { Identifiable } from './src/Models/Identifiable'
