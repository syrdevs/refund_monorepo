import * as React from 'react';
import { ProtocolForList } from '../../Entities/Protocol';
declare type CompProps = {
    match: any;
};
declare type CompState = {
    protocolInfo?: ProtocolForList;
    fetched: boolean;
};
declare class Protocol extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onCommandClick;
    private onPublish;
    private fetchProtocol;
}
export default Protocol;
