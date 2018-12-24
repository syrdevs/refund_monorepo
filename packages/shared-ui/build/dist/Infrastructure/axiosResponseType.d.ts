import { AxiosData, AxiosDataUntyped } from './axiosResponseDataWrapper';
export declare type AxiosResponseTypeWithData<T> = Promise<AxiosData<T>>;
export declare type AxiosResponseType = Promise<AxiosDataUntyped>;
