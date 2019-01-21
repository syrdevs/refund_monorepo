import { RouterState } from 'connected-react-router'
import InfrastructureState from './InfrastructureState'
import UserState from './UserState'

export default interface State {
  router: RouterState
  userState: UserState
  infrastructureState: InfrastructureState
}
