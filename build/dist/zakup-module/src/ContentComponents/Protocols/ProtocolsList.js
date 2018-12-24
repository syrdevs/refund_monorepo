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
import { message, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { PROTOCOLS_TABLE_ITEMS_PER_PAGE } from '../../Infrastructure/localStorageConstants';
import { NativeHistory } from '../../Redux/history';
import { createApiClient, getAppRoute } from '../../utils';
import { ContentLayout } from '../shared';
var columns = [
    {
        title: 'Плановый период',
        dataIndex: 'periodYear.year',
        width: '200px',
        sorter: function (a, b) { return a.periodYear.year - b.periodYear.year; },
    },
    {
        title: 'Регион',
        dataIndex: 'region.nameRu',
        sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
    },
    {
        title: 'Регистрационный номер',
        dataIndex: 'number',
        width: '220px',
        sorter: function (a, b) { return a.number.localeCompare(b.number); },
        render: function (data, originalRow) {
            return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/protocols/" + originalRow.id.toString()) } }, data));
        },
    },
    {
        title: 'Тип',
        width: '150px',
        dataIndex: 'planProtocolType.nameRu',
        sorter: function (a, b) {
            return a.planProtocolType.nameRu.localeCompare(b.planProtocolType.nameRu);
        },
    },
    {
        title: 'Дата',
        width: '120px',
        dataIndex: 'documentDate',
        sorter: function (a, b) {
            return +moment(a.documentDate, 'DD.MM.YYYY') - +moment(b.documentDate, 'DD.MM.YYYY');
        },
    },
];
var ProtocolsList = /** @class */ (function (_super) {
    __extends(ProtocolsList, _super);
    function ProtocolsList(props) {
        var _this = _super.call(this, props) || this;
        _this.fetchProtocols = function (page, pageSize) {
            createApiClient()
                .fetchProtocols(page - 1, pageSize)
                .then(function (resp) {
                var data = resp.data;
                _this.setState({
                    totalElements: data.totalElements,
                    protocols: data.content,
                });
            })
                .catch(function (error) { return message.error(error.message); });
        };
        var page = +props.match.params.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(PROTOCOLS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            protocols: [],
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            totalElements: 0,
        };
        return _this;
    }
    ProtocolsList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.fetchProtocols(currentPage, itemsPerPage);
    };
    ProtocolsList.prototype.render = function () {
        var _this = this;
        var header = this.props.header;
        var _a = this.state, protocols = _a.protocols, totalElements = _a.totalElements;
        var contentNode = protocols && (React.createElement(Table, { columns: columns, dataSource: protocols, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/protocols/all/" + page));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.fetchProtocols(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(PROTOCOLS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/protocols/all/" + current));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.fetchProtocols(current, size);
                },
            } }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'procotols/all/1',
                breadcrumbName: 'Все протоколы',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return ProtocolsList;
}(React.Component));
export default ProtocolsList;
//# sourceMappingURL=ProtocolsList.js.map