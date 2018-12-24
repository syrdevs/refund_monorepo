import * as React from 'react';
import Supplier from '../../Entities/Supplier';
declare type Props = {
    header: string;
    suppliers: Supplier[];
    fetchAllSuppliers: () => any;
};
declare class SuppliersReestrAll extends React.Component<Props> {
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof SuppliersReestrAll, Pick<Props, "header">>;
export default _default;
