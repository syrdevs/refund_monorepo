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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { buildAppRoute } from '@vitacore/shared-ui';
import { Icon, message, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateYesNoModalInfo from '../../../Components/Modals/YesNoModalInfo';
import AppRolesDict from '../../../Data/AppRolesDict';
import { APPLICATIONS_TABLE_ITEMS_PER_PAGE } from '../../../Infrastructure/localStorageConstants';
import { addNewModal, closeRecentModal } from '../../../Redux/Actions/infrastructureStateActions';
import { getHistory, NativeHistory } from '../../../Redux/history';
import { createApiClient, getAppRoute } from '../../../utils';
import { ContentLayout } from '../../shared';
var ApplicationsList = /** @class */ (function (_super) {
    __extends(ApplicationsList, _super);
    function ApplicationsList(props) {
        var _this = _super.call(this, props) || this;
        _this.onRowSelectionChange = function (selectedRowKeys) {
            _this.setState({
                selectedRowKeys: selectedRowKeys,
            });
        };
        _this.onCommandClick = function (commandId, isReport) {
            createApiClient().runCommand(commandId, _this.state.selectedRowKeys, isReport);
        };
        _this.onDelete = function (id) {
            var modalInfo = CreateYesNoModalInfo('Предупреждение', 'Вы действительно хотите удалить заявку?', function () {
                createApiClient()
                    .deleteApplication(id)
                    .then(function () {
                    message.success('Заявка удалена');
                    var _a = _this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
                    _this.fetchApplications(currentPage, itemsPerPage);
                })
                    .catch(function () { return message.error('Ошибка при удалении заявки'); });
                _this.props.closeRecentModal();
            }, undefined, function () {
                _this.props.closeRecentModal();
            }, undefined, false);
            _this.props.addNewModal(modalInfo);
        };
        _this.getColumns = function () {
            var columns = [
                {
                    title: 'Регион осущ. деятельности',
                    dataIndex: 'region.nameRu',
                    width: '150px',
                    sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
                },
                {
                    title: 'Организация',
                    dataIndex: 'clinic.shortName',
                    width: '250px',
                    sorter: function (a, b) { return a.clinic.shortName.localeCompare(b.clinic.shortName); },
                },
                {
                    title: 'Регистрационный номер',
                    dataIndex: 'number',
                    width: '160px',
                    sorter: function (a, b) { return a.number.localeCompare(b.number); },
                    render: function (data, originalRow) {
                        return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/requests/applications/" + originalRow.id.toString()) } }, data));
                    },
                },
                {
                    title: 'Дата подачи заявки',
                    width: '150px',
                    dataIndex: 'documentDate',
                    sorter: function (a, b) {
                        return moment(a.documentDate, 'DD.MM.YYYY').diff(moment(b.documentDate, 'DD.MM.YYYY'));
                    },
                    defaultSortOrder: 'descend',
                },
                {
                    title: 'Роль',
                    width: '150px',
                    dataIndex: 'role.name',
                    sorter: function (a, b) { return a.role.name.localeCompare(b.role.name); },
                },
                {
                    title: 'Комментарий',
                    dataIndex: 'descr',
                    width: '120px',
                },
                {
                    title: '',
                    width: '52px',
                    dataIndex: 'id',
                    render: function (id, originalRow) {
                        return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement(Icon, { type: "check", style: { color: '#1890ff', cursor: 'pointer', marginRight: '5px' }, onClick: function () { return _this.onAccept(id); } }),
                            React.createElement(Icon, { type: "delete", style: { color: '#1890ff', cursor: 'pointer' }, onClick: function () { return _this.onDelete(id); } })));
                    },
                },
            ];
            return columns;
        };
        _this.onAccept = function (id) {
            var modalInfo = CreateYesNoModalInfo('Предупреждение', 'Вы действительно хотите принять заявку?', function () {
                createApiClient()
                    .acceptApplication(id)
                    .then(function () { return message.success('Заявка принята'); })
                    .catch(function () { return message.error('Ошибка при принятии заявки'); });
                _this.props.closeRecentModal();
            }, undefined, function () {
                _this.props.closeRecentModal();
            }, undefined, false);
            _this.props.addNewModal(modalInfo);
        };
        // private onDecline = (id: string) => {
        //   const modalInfo = createRejectReasonModalInfo(
        //     'Укажите причину отклонения',
        //     (rejectText: string) => () => {
        //       createApiClient()
        //         .declineApplication(id, rejectText)
        //         .then(() => message.success('Заявка отклонена'))
        //         .catch(() => message.error('Ошибка при отклонении заявки'))
        //       this.props.closeRecentModal()
        //     },
        //     () => {
        //       this.props.closeRecentModal()
        //     },
        //     'Отклонить',
        //     undefined,
        //     false
        //   )
        //   this.props.addNewModal(modalInfo)
        // }
        _this.fetchApplications = function (page, pageSize) {
            createApiClient()
                .fetchApplications(page - 1, pageSize)
                .then(function (resp) {
                var data = resp.data;
                _this.setState({
                    totalElements: data.totalElements,
                    applications: data.content.map(function (i) { return (__assign({}, i, { role: AppRolesDict.find(function (k) { return k.id === "" + i.role; }) })); }),
                });
            })
                .catch(function (error) { return message.error(error.message); });
        };
        _this.onNewRequestClick = function () {
            getHistory().push(buildAppRoute(getAppRoute(), '/requests/applications/new'));
        };
        var page = +props.match.params.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(APPLICATIONS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            applications: [],
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            totalElements: 0,
            selectedRowKeys: [],
        };
        return _this;
    }
    ApplicationsList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.fetchApplications(currentPage, itemsPerPage);
    };
    ApplicationsList.prototype.render = function () {
        var _this = this;
        var header = this.props.header;
        var _a = this.state, applications = _a.applications, totalElements = _a.totalElements;
        var contentNode = applications && (React.createElement(Table, { rowSelection: { onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }, columns: this.getColumns(), dataSource: applications, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/requests/applications/all/" + page));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.fetchApplications(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(APPLICATIONS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), "/requests/applications/all/" + current));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.fetchApplications(current, size);
                },
            } }));
        var buttons = [
            {
                text: 'Создать заявку',
                onClick: this.onNewRequestClick,
            },
        ];
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'requests/applications/all',
                breadcrumbName: 'Заявки на включение в базу данных субъектов здравоохранения',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, buttons: buttons, breadcrumbRoutes: bcRoutes, entity: "app", disableCommands: this.state.selectedRowKeys.length === 0, showCommands: true, onCommandClick: this.onCommandClick }, contentNode));
    };
    return ApplicationsList;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return {
        addNewModal: function (modalInfo) { return dispatch(addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(closeRecentModal(numberToClose)); },
    };
};
export default connect(null, mapDispatchToProps)(ApplicationsList);
//# sourceMappingURL=ApplicationsList.js.map