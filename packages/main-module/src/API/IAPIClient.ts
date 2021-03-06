import { AxiosResponseType, AxiosResponseTypeWithData } from '@vitacore/shared-ui'
import { default as User, UserInfo } from '../Models/User'

export default interface IAPIClient {
  requestLogin: (userName: string, password: string) => AxiosResponseTypeWithData<User | null>
  checkAuthToken: () => AxiosResponseTypeWithData<{ userName: string }>
  getUserInfo: () => AxiosResponseTypeWithData<UserInfo>
  logout: () => AxiosResponseType
}
