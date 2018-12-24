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
import { Icon, Table } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCommissions } from '../../Redux/Actions/businessDataStateActions';
import { getHistory } from '../../Redux/history';
import { getAppRoute } from '../../utils';
import { ContentLayout } from '../shared';
var columns = [
    {
        title: '№ п/п',
        width: '60px',
        dataIndex: 'id',
        key: '#',
        align: 'center',
        render: function (data, originalRow, index) {
            return index + 1;
        },
    },
    {
        title: 'Регион',
        dataIndex: 'region.nameRu',
        sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
        render: function (data, originalRow) {
            return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/commissions/" + originalRow.id + "/members") } }, data));
        },
    },
    {
        title: 'Дата начала действия комиссии',
        width: '270px',
        dataIndex: 'dateBegin',
        sorter: function (a, b) { return moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY')); },
        defaultSortOrder: 'descend',
    },
    {
        title: '',
        width: '30px',
        dataIndex: 'id',
        align: 'center',
        render: function (id, originalRow) {
            return (React.createElement(Link, { to: buildAppRoute(getAppRoute(), "/commissions/" + id) },
                React.createElement(Icon, { type: "edit" })));
        },
    },
];
var CommissionsList = /** @class */ (function (_super) {
    __extends(CommissionsList, _super);
    function CommissionsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommissionsList.prototype.componentDidMount = function () {
        this.props.fetchCommissions();
    };
    CommissionsList.prototype.render = function () {
        var _a = this.props, commissions = _a.commissions, header = _a.header;
        var contentNode = commissions && (React.createElement(Table, { columns: columns, dataSource: commissions, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'commissions',
                breadcrumbName: 'Комиссии',
            },
        ];
        var buttons = [
            {
                text: 'Создать комиссию',
                onClick: function () { return getHistory().push(buildAppRoute(getAppRoute(), '/commissions/new')); },
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, buttons: buttons }, contentNode));
    };
    return CommissionsList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        commissions: state.businessDataState.commissionsData.commissions,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCommissions: function () { return dispatch(fetchCommissions()); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommissionsList);
//# sourceMappingURL=CommissionsList.js.map