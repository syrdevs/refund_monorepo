import * as React from 'react';
import { ModalInfo } from '../../Models/ModalInfo';
declare type Props = {
    modals: ModalInfo[];
    closeRecentModal: () => any;
};
declare class ModalsContainer extends React.Component<Props> {
    render(): JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ModalsContainer, Pick<Props, never>>;
export default _default;
