import * as React from 'react';
export interface ButtonData {
    text: string;
    onClick: (event?: React.MouseEvent<HTMLElement>) => void;
    colorSchema?: 'green' | 'blue';
    ref?: React.RefObject<Button>;
    interactive?: boolean;
    disableClicksDuringLoading?: boolean;
    disabled?: boolean;
    type?: string;
}
declare type State = {
    btnState: ButtonState;
    resultMessage?: string;
};
declare enum ButtonState {
    NORMAL = 0,
    LOADING = 1,
    FAILED = 2,
    SUCCESS = 3
}
declare class Button extends React.Component<ButtonData, State> {
    constructor(props: ButtonData);
    setLoading: (value: boolean) => void;
    showFailed: (errorMessage?: string | undefined) => void;
    showSuccessed: (successMessage?: string | undefined) => void;
    render(): JSX.Element;
    private changeStateWithDelayToNormal;
}
export default Button;
