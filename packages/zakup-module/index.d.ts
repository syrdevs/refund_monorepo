declare module '@vitacore/zakup-module'

import { AppGlobalProps } from '@vitacore/shared-ui'
import { Component } from 'react'

declare class ZakupModule extends Component<AppGlobalProps> {}
export default ZakupModule

export { default as LeftMenuItems } from './src/Data/leftMenuItems'
