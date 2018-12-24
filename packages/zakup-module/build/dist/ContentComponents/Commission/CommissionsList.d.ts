import * as React from 'react';
import { Commission } from '../../Entities/Commission';
declare type Props = {
    commissions: Commission[] | null;
    header: string;
    fetchCommissions: () => any;
};
declare class CommissionsList extends React.Component<Props> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof CommissionsList, Pick<Props, "header">>;
export default _default;
