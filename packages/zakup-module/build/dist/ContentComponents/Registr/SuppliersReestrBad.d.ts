import * as React from 'react';
import { BadSupplier } from '../../Entities/Supplier';
declare type Props = {
    header: string;
    badSuppliers: BadSupplier[];
    fetchBadSuppliers: () => any;
};
declare class SuppliersReestrBad extends React.Component<Props> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof SuppliersReestrBad, Pick<Props, "header">>;
export default _default;
