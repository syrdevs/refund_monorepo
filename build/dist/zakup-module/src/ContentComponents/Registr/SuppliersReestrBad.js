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
import { fetchBadSuppliers } from '../../Redux/Actions/businessDataStateActions';
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
        width: '115px',
        sorter: function (a, b) { return a.regionNum.localeCompare(b.regionNum); },
    },
    {
        title: 'Наименование субъекта здравоохранения',
        dataIndex: 'name',
        sorter: function (a, b) { return a.name.localeCompare(b.name); },
        width: '40%',
        render: function (data) {
            return React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), '/reestr') } }, data);
        },
    },
    {
        title: 'Основание',
        dataIndex: 'reasonLink',
        render: function (data, originalRow) {
            return React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), data) } }, originalRow.reasonLinkText);
        },
    },
    {
        title: 'Дата включения',
        sorter: function (a, b) { return +a.includedFrom - +b.includedFrom; },
        width: '160px',
        dataIndex: 'includedFrom',
        render: function (data) {
            return data.format('DD.MM.YYYY');
        },
    },
    {
        title: 'Дата исключения',
        sorter: function (a, b) {
            if (!a.includedTo && !b.includedTo) {
                return 0;
            }
            if (!a.includedTo && b.includedTo) {
                return -1;
            }
            if (a.includedTo && !b.includedTo) {
                return 1;
            }
            return +a.includedTo - +b.includedTo;
        },
        width: '160px',
        dataIndex: 'includedTo',
        render: function (data) {
            if (!data) {
                return '';
            }
            return data.format('DD.MM.YYYY');
        },
    },
];
var SuppliersReestrBad = /** @class */ (function (_super) {
    __extends(SuppliersReestrBad, _super);
    function SuppliersReestrBad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuppliersReestrBad.prototype.componentDidMount = function () {
        this.props.fetchBadSuppliers();
    };
    SuppliersReestrBad.prototype.render = function () {
        var _a = this.props, badSuppliers = _a.badSuppliers, header = _a.header;
        var contentNode = badSuppliers && (React.createElement(Table, { columns: columns, dataSource: badSuppliers, rowKey: function (r) { return r.name; }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'reestr/bad',
                breadcrumbName: 'Регистр недобросоветсных участников',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return SuppliersReestrBad;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        badSuppliers: state.businessDataState.badSuppliers,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchBadSuppliers: function () { return dispatch(fetchBadSuppliers()); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersReestrBad);
//# sourceMappingURL=SuppliersReestrBad.js.map