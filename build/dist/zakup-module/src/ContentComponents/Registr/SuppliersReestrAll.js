var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { buildAppRoute } from '@vitacore/shared-ui';
import { Table } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllSuppliers } from '../../Redux/Actions/businessDataStateActions';
import { getAppRoute } from '../../utils';
import { ContentLayout } from '../shared';
var columns = [
    {
        title: '№ п/п',
        width: '60px',
        dataIndex: 'name',
        key: '#',
        align: 'center',
        render: function (data, originalRow, index) {
            return index + 1;
        },
    },
    {
        title: '№ региона',
        dataIndex: 'regionNum',
        sorter: function (a, b) { return a.regionNum.localeCompare(b.regionNum); },
    },
    {
        title: 'Наименование субъекта здравоохранения',
        dataIndex: 'name',
        sorter: function (a, b) { return a.name.localeCompare(b.name); },
        width: '55%',
        render: function (data, originalRow) {
            var isBad = originalRow.isBadSupplier;
            var styleObj = isBad ? { color: 'red' } : undefined;
            return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), isBad ? '/reestr/bad' : '/reestr/all') }, style: styleObj }, data));
        },
    },
    {
        title: 'БИК/ИНН',
        dataIndex: 'BIN_INN',
    },
    {
        title: 'Территориальная принадлежность',
        sorter: function (a, b) { return a.territory.localeCompare(b.territory); },
        width: '170px',
        dataIndex: 'territory',
    },
];
var SuppliersReestrAll = /** @class */ (function (_super) {
    __extends(SuppliersReestrAll, _super);
    function SuppliersReestrAll() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuppliersReestrAll.prototype.componentDidMount = function () {
        this.props.fetchAllSuppliers();
    };
    SuppliersReestrAll.prototype.render = function () {
        var _a = this.props, suppliers = _a.suppliers, header = _a.header;
        var contentNode = suppliers && (React.createElement(Table, { columns: columns, dataSource: suppliers, rowKey: function (r) { return r.name; }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'reestr/all',
                breadcrumbName: 'Регистр поставщиков',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return SuppliersReestrAll;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        suppliers: state.businessDataState.suppliers,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAllSuppliers: function () { return dispatch(fetchAllSuppliers()); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersReestrAll);
//# sourceMappingURL=SuppliersReestrAll.js.map