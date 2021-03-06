export default interface User {
  userName: string
  token: string
  userInfo?: UserInfo
}

export interface UserInfo {
  roles?: string[]
  company?: string
  eMail?: string
  phoneNumber?: string
  position?: string
}
