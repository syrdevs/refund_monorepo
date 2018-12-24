export declare type ReduxActionType<T = {
    [key: string]: any;
} | number | string | boolean | undefined> = {
    type: string;
    payload: T;
};
