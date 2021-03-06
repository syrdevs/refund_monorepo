import { default as User } from '../../Models/User'

export default interface UserState {
  isAuthenticated: boolean
  loginInProgress: boolean
  loginErrorMessage: string
  tokenCheckFailed: boolean
  user: User
}
