export interface AxiosDataUntyped {
    [key: string]: any;
}
export interface AxiosData<T> extends AxiosDataUntyped {
    data: T;
}
