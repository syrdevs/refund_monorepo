import { AxiosResponseTypeWithData } from '@vitacore/shared-ui'
import axios from 'axios'
import { default as User } from '../Models/User'
import { getAuthToken } from '../Services/AuthenticationService'
import { requestFinished, requestStarted } from '../utils'
import IAPIClient from './IAPIClient'

let baseUrl: string = 'http://185.27.192.177:6307/api'
class APIClient implements IAPIClient {
  public static async doApiCall(
    url: string,
    method?: string,
    data?: any,
    params?: any,
    tokenRequired: boolean = true,
    contentType?: string
  ): Promise<any> {
    if (!url || url.length === 0) {
      throw new Error('No URL provided')
    }

    if (!baseUrl) {
      let origin = window.location.origin
      if (!origin || origin.length === 0) {
        throw new Error('Cannot parse current url')
      }

      if (origin[origin.length - 1] === '/') {
        origin = origin.substr(0, origin.length - 1)
      }

      baseUrl = `${origin}/api`
    }

    const headers = {}

    if (tokenRequired) {
      const authToken = getAuthToken()
      if (!authToken) {
        throw new Error('No auth token provided')
      }

      headers['Authorization'] = `Bearer ${authToken}`
    }

    if (data) {
      headers['Content-Type'] = contentType || 'application/json; charset=UTF-8'
    }

    const formattedUrl = baseUrl + (url[0] !== '/' ? `/${url}` : url)
    const requestObj = {
      method: data && !method ? 'post' : method || 'get',
      url: formattedUrl,
      data,
      params,
      headers,
    }

    // tslint:disable-next-line:no-string-literal
    if (axios.interceptors.request['handlers'].length === 0) {
      axios.interceptors.request.use(config => {
        requestStarted()
        return config
      })
    }

    // tslint:disable-next-line:no-string-literal
    if (axios.interceptors.response['handlers'].length === 0) {
      axios.interceptors.response.use(
        response => {
          requestFinished()
          return response
        },
        error => {
          requestFinished()
          return Promise.reject(error)
        }
      )
    }

    return axios(requestObj).catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error)
      throw error
    })
  }

  public requestLogin(userName: string, password: string): AxiosResponseTypeWithData<User | null> {
    const bodyObj = {
      login: userName,
      password,
    }

    return APIClient.doApiCall('/login', 'POST', bodyObj, null, false)
  }

  public checkAuthToken() {
    return APIClient.doApiCall('/checkToken', 'GET')
  }

  public logout() {
    return APIClient.doApiCall('/logout', 'POST')
  }
}

export default APIClient
