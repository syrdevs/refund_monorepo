export declare type AppGlobalProps = {
    moduleRoute?: string;
    appRoute: string;
    history?: any;
    handleNoMatch?: boolean;
    simpleAuthCheck?: () => boolean;
    promiseAuthCheck?: () => Promise<boolean>;
    getAuthToken?: () => string | null;
    requestStarted?: () => void;
    requestFinished?: (message?: string) => void;
    getUserLanguage?: () => string;
    subscribeToUserLanguageChange?: (cb: (lng: string) => any) => void;
};
