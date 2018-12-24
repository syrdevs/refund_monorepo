import { AxiosData, AxiosDataUntyped } from './axiosResponseDataWrapper'

export type AxiosResponseTypeWithData<T> = Promise<AxiosData<T>>
export type AxiosResponseType = Promise<AxiosDataUntyped>
