import { default as User } from '../../Models/User'

export default interface UserState {
  isAuthenticated: boolean
  loginInProgress: boolean
  user: User
  loginErrorMessage: string
  tokenCheckFailed: boolean
}
