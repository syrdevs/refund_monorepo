import { AxiosData, AxiosDataUntyped } from '@vitacore/shared-ui'
import { User } from '../Models'
import { UserInfo } from '../Models/User'
import { getAuthToken } from '../Services/AuthenticationService'
import { emulateRequest } from '../utils'
import IAPIClient from './IAPIClient'

class FakeAPIClient implements IAPIClient {
  public requestLogin(userName: string, password: string) {
    return new Promise<AxiosData<User | null>>(resolve => {
      emulateRequest(() => {
        if (userName === 'admin' && password === '123456') {
          resolve({ data: { userName: 'TEST', token: 'my-token' } })
        } else {
          resolve({ data: null })
        }
      }, 400)
    })
  }

  public checkAuthToken() {
    return new Promise<AxiosData<{ userName: string }>>((resolve, reject) => {
      emulateRequest(() => {
        if (getAuthToken() === 'my-token') {
          resolve({ data: { userName: 'TEST' } })
        } else {
          reject(new Error('Authentication exception'))
        }
      }, 400)
    })
  }

  public logout() {
    return new Promise<AxiosDataUntyped>((resolve, reject) => {
      emulateRequest(() => {
        if (Math.random() > 0.5) {
          resolve()
        } else {
          reject(new Error('Logout exception'))
        }
      }, 1200)
    })
  }

  public getUserInfo() {
    return new Promise<AxiosData<UserInfo>>(resolve => {
      emulateRequest(() => {
        resolve({
          data: {
            roles: ['FSMS1', 'FSMS2', 'Администратор'],
            company: 'Департамент информационных технологий',
            eMail: 'odin@itdepartment',
            phoneNumber: '+7-776-173-13-33',
            position: 'Главный администратор',
          },
        })
      }, 1200)
    })
  }
}

export default FakeAPIClient
