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
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ZAKUP_ADS_TABLE_ITEMS_PER_PAGE } from '../../Infrastructure/localStorageConstants';
import { fetchNotices } from '../../Redux/Actions/businessDataStateActions';
import { NativeHistory } from '../../Redux/history';
import { createApiClient, getAppRoute } from '../../utils';
import { ContentLayout } from '../shared';
var NoticesList = /** @class */ (function (_super) {
    __extends(NoticesList, _super);
    function NoticesList(props) {
        var _this = _super.call(this, props) || this;
        _this.onRowSelectionChange = function (selectedRowKeys) {
            _this.setState({
                selectedRowKeys: selectedRowKeys,
            });
        };
        _this.onCommandClick = function (commandId, isReport) {
            createApiClient().runCommand(commandId, _this.state.selectedRowKeys, isReport);
        };
        _this.getColumns = function () {
            return [
                {
                    title: 'Наименование объявления',
                    dataIndex: 'noticeType.nameRu',
                    sorter: function (a, b) { return a.noticeType.code.localeCompare(b.noticeType.code); },
                    render: function (data, originalRow) {
                        return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/notices/" + originalRow.id.toString()) } }, data));
                    },
                },
                {
                    title: 'Регион осущ. деятельности',
                    sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
                    width: '175px',
                    dataIndex: 'region.nameRu',
                },
                {
                    title: 'Плановый период',
                    sorter: function (a, b) { return a.periodYear.year.localeCompare(b.periodYear.year); },
                    width: '120px',
                    dataIndex: 'periodYear.year',
                },
                {
                    title: 'Поданные заявки',
                    dataIndex: 'numberOfApplications',
                    width: '110px',
                    sorter: function (a, b) { return a.numberOfApplications - b.numberOfApplications; },
                    render: function (data, originalRow) {
                        return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/notices/" + originalRow.id.toString() + "/applicants") } }, data));
                    },
                },
                {
                    title: 'Дата начала приема заявок',
                    dataIndex: 'dateBegin',
                    width: '150px',
                    sorter: function (a, b) { return moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY')); },
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Дата окончания приема заявок',
                    dataIndex: 'dateEnd',
                    width: '150px',
                    sorter: function (a, b) { return moment(a.dateEnd, 'DD.MM.YYYY').diff(moment(b.dateEnd, 'DD.MM.YYYY')); },
                },
                {
                    title: 'Статус',
                    sorter: function (a, b) { return a.status.localeCompare(b.status); },
                    width: '100px',
                    dataIndex: 'status',
                },
            ];
        };
        _this.onNewNoticeClick = function () {
            _this.props.history.push(buildAppRoute(getAppRoute(), '/notices/new'));
        };
        var page = +props.match.params.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(ZAKUP_ADS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            selectedRowKeys: [],
        };
        return _this;
    }
    NoticesList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.props.fetchNotices(currentPage, itemsPerPage);
    };
    NoticesList.prototype.render = function () {
        var _this = this;
        var _a = this.props, totalElements = _a.totalElements, notices = _a.notices, header = _a.header;
        var contentNode = notices && (React.createElement(Table, { rowSelection: { onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }, columns: this.getColumns(), dataSource: notices, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/notices/all/" + page));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.props.fetchNotices(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(ZAKUP_ADS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/notices/all/" + current));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.props.fetchNotices(current, size);
                },
            } }));
        var buttons = [
            {
                text: 'Создать объявление',
                onClick: this.onNewNoticeClick,
            },
        ];
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'notices/all/1',
                breadcrumbName: 'Все объявления',
            },
        ];
        return (React.createElement(ContentLayout, { entity: "notice", disableCommands: this.state.selectedRowKeys.length === 0, showCommands: true, onCommandClick: this.onCommandClick, contentName: header, buttons: buttons, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return NoticesList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        notices: state.businessDataState.noticeData.notices,
        totalElements: state.businessDataState.noticeData.total,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchNotices: function (page, pageSize, onlyMy) {
            return dispatch(fetchNotices(page - 1, pageSize, onlyMy));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoticesList));
//# sourceMappingURL=NoticesList.js.map