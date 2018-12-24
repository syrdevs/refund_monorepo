import React from 'react';
import { ProtocolForList } from '../../Entities/Protocol';
declare type Props = {
    header: string;
    match: any;
};
declare type State = {
    protocols: ProtocolForList[];
    currentPage: number;
    itemsPerPage: number;
    totalElements: number;
};
declare class ProtocolsList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private fetchProtocols;
}
export default ProtocolsList;
