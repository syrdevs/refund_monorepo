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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PROPOSALS_TABLE_ITEMS_PER_PAGE } from '../../../Infrastructure/localStorageConstants';
import { addNewModal, closeRecentModal } from '../../../Redux/Actions/infrastructureStateActions';
import { NativeHistory } from '../../../Redux/history';
import { createApiClient, getAppRoute } from '../../../utils';
import { ContentLayout } from '../../shared';
var ProposalsList = /** @class */ (function (_super) {
    __extends(ProposalsList, _super);
    function ProposalsList(props) {
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
            var columns = [
                {
                    title: 'Плановый период',
                    dataIndex: 'periodYear.year',
                    width: '120px',
                    sorter: function (a, b) { return a.periodYear.year - b.periodYear.year; },
                },
                {
                    title: 'Регион осущ. деятельности',
                    dataIndex: 'region.nameRu',
                    width: '200px',
                    sorter: function (a, b) { return a.region.nameRu.localeCompare(b.region.nameRu); },
                },
                {
                    title: 'Организация',
                    dataIndex: 'clinic.shortName',
                    sorter: function (a, b) { return a.clinic.shortName.localeCompare(b.clinic.shortName); },
                },
                {
                    title: 'Регистрационный номер',
                    dataIndex: 'number',
                    width: '170px',
                    sorter: function (a, b) { return a.number.localeCompare(b.number); },
                    render: function (data, originalRow) {
                        return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/requests/proposals/" + originalRow.id.toString()) } }, data));
                    },
                },
                {
                    title: 'Дата подачи заявки',
                    width: '150px',
                    dataIndex: 'documentDate',
                    sorter: function (a, b) {
                        return +moment(a.documentDate, 'DD.MM.YYYY') - +moment(b.documentDate, 'DD.MM.YYYY');
                    },
                },
                {
                    title: 'Комментарий',
                    dataIndex: 'descr',
                },
            ];
            return columns;
        };
        // private onAccept = (id: string) => {
        //   const modalInfo = CreateYesNoModalInfo(
        //     'Предупреждение',
        //     'Вы действительно хотите принять заявку?',
        //     () => {
        //       createApiClient()
        //         .acceptProposal(id)
        //         .then(() => message.success('Заявка принята'))
        //         .catch(() => message.error('Ошибка при принятии заявки'))
        //       this.props.closeRecentModal()
        //     },
        //     undefined,
        //     () => {
        //       this.props.closeRecentModal()
        //     },
        //     undefined,
        //     false
        //   )
        //   this.props.addNewModal(modalInfo)
        // }
        //
        // private onDelete = (id: string) => {
        //   const modalInfo = CreateYesNoModalInfo(
        //     'Предупреждение',
        //     'Вы действительно хотите удалить заявку?',
        //     () => {
        //       createApiClient()
        //         .deleteProposal(id)
        //         .then(() => message.success('Заявка удалена'))
        //         .catch(() => message.error('Ошибка при удалении заявки'))
        //       this.props.closeRecentModal()
        //     },
        //     undefined,
        //     () => {
        //       this.props.closeRecentModal()
        //     },
        //     undefined,
        //     false
        //   )
        //   this.props.addNewModal(modalInfo)
        // }
        //
        // private onDecline = (id: string) => {
        //   const modalInfo = createRejectReasonModalInfo(
        //     'Укажите причину отклонения',
        //     (rejectText: string) => () => {
        //       createApiClient()
        //         .declineProposal(id, rejectText)
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
        _this.fetchProposals = function (page, pageSize) {
            createApiClient()
                .fetchProposals(page - 1, pageSize, _this.props.noticeId)
                .then(function (resp) {
                var data = resp.data;
                _this.setState({
                    totalElements: data.totalElements,
                    proposals: data.content,
                });
            })
                .catch(function (error) { return message.error(error.message); });
        };
        var page = +_this.props.page;
        if (!page) {
            page = 1;
        }
        var itemsPerPage = localStorage.getItem(PROPOSALS_TABLE_ITEMS_PER_PAGE);
        _this.state = {
            proposals: [],
            selectedRowKeys: [],
            currentPage: page,
            itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
            totalElements: 0,
        };
        return _this;
    }
    ProposalsList.prototype.componentDidMount = function () {
        var _a = this.state, currentPage = _a.currentPage, itemsPerPage = _a.itemsPerPage;
        this.fetchProposals(currentPage, itemsPerPage);
    };
    ProposalsList.prototype.render = function () {
        var _this = this;
        var _a = this.props, header = _a.header, noticeId = _a.noticeId;
        var _b = this.state, proposals = _b.proposals, totalElements = _b.totalElements;
        var contentNode = proposals && (React.createElement(Table, { rowSelection: { onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }, columns: this.getColumns(), dataSource: proposals, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: {
                position: 'both',
                pageSize: this.state.itemsPerPage,
                current: this.state.currentPage,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['10', '25', '50', '100'],
                total: totalElements,
                onChange: function (page, pageSize) {
                    var urlSuffix = noticeId ? "/notices/" + noticeId + "/applicants/" + page : "/requests/proposals/all/" + page;
                    NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), urlSuffix));
                    _this.setState({
                        currentPage: page,
                    });
                    _this.fetchProposals(page, pageSize);
                },
                onShowSizeChange: function (current, size) {
                    localStorage.setItem(PROPOSALS_TABLE_ITEMS_PER_PAGE, size.toString());
                    if (_this.state.currentPage !== current) {
                        var urlSuffix = _this.props.noticeId
                            ? "/notices/" + _this.props.noticeId + "/applicants/" + current
                            : "/requests/proposals/all/" + current;
                        NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), urlSuffix));
                    }
                    _this.setState({
                        currentPage: current,
                        itemsPerPage: size,
                    });
                    _this.fetchProposals(current, size);
                },
            } }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'requests/proposals/all',
                breadcrumbName: 'Заявки на объемы',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, entity: "proposal", disableCommands: this.state.selectedRowKeys.length === 0, showCommands: true, onCommandClick: this.onCommandClick }, contentNode));
    };
    return ProposalsList;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return {
        addNewModal: function (modalInfo) { return dispatch(addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(closeRecentModal(numberToClose)); },
    };
};
export default connect(null, mapDispatchToProps)(ProposalsList);
//# sourceMappingURL=ProposalsList.js.map