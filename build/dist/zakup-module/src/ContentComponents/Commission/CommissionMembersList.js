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
import { Icon, message, Table } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo';
import CreateYesNoModalInfo from '../../Components/Modals/YesNoModalInfo';
import { dispatchClearFetchEntityStatus, fetchSingleCommission } from '../../Redux/Actions/businessDataStateActions';
import { addNewModal, closeRecentModal, dispatchAddNewModal, dispatchCloseRecentModal, } from '../../Redux/Actions/infrastructureStateActions';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
import { getHistory } from '../../Redux/history';
import { createApiClient, getAppRoute } from '../../utils';
import { ContentLayout } from '../shared';
var getColumns = function (commissionId, onDelete) {
    return [
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
            title: 'ФИО',
            dataIndex: 'id',
            sorter: function (a, b) {
                var aFio = a.person.lastName + " " + a.person.firstName + (a.person.patronymic ? " " + a.person.patronymic : '');
                var bFio = b.person.lastName + " " + b.person.firstName + (a.person.patronymic ? " " + a.person.patronymic : '');
                return aFio.localeCompare(bFio);
            },
            render: function (data, originalRow) {
                var fio = originalRow.person.lastName + " " + originalRow.person.firstName + (originalRow.person.patronymic ? " " + originalRow.person.patronymic : '');
                return (React.createElement(Link, { to: { pathname: buildAppRoute(getAppRoute(), "/commissions/" + commissionId + "/members/" + data) } }, fio));
            },
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Роль',
            dataIndex: 'meetingMemberRole.nameRu',
            sorter: function (a, b) {
                return a.meetingMemberRole.nameRu.localeCompare(b.meetingMemberRole.nameRu);
            },
        },
        {
            title: 'Дата начала работы в составе комиссии',
            sorter: function (a, b) {
                return moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY'));
            },
            width: '200px',
            dataIndex: 'dateBegin',
        },
        {
            title: 'Дата окончания работы в составе комиссии',
            sorter: function (a, b) {
                if (a.dateEnd && !b.dateEnd) {
                    return 1;
                }
                if (!a.dateEnd && b.dateEnd) {
                    return -1;
                }
                if (!a.dateEnd && !b.dateEnd) {
                    return 0;
                }
                return moment(a.dateEnd, 'DD.MM.YYYY').diff(moment(b.dateEnd, 'DD.MM.YYYY'));
            },
            width: '200px',
            dataIndex: 'dateEnd',
        },
        {
            title: '',
            width: '60px',
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            render: function (id, originalRow) {
                return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                    React.createElement(Link, { to: buildAppRoute(getAppRoute(), "/commissions/" + commissionId + "/members/" + id) },
                        React.createElement(Icon, { type: "edit" })),
                    React.createElement(Icon, { style: { color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }, type: "delete", onClick: function () { return onDelete(commissionId, id); } })));
            },
        },
    ];
};
var CommissionMembersList = /** @class */ (function (_super) {
    __extends(CommissionMembersList, _super);
    function CommissionMembersList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchCommission = function (id) {
            _this.props.fetchCommissionById(id);
        };
        _this.onDeleteCommissionMember = function (commissionId, id) {
            var modalInfo = CreateYesNoModalInfo('Вы действительно хотите удалить члена комиссии?', null, function () {
                createApiClient()
                    .deleteCommissionMember(id)
                    .then(function () {
                    message.success('Член комиссии успешно удален');
                    _this.props.closeRecentModal();
                    _this.fetchCommission(_this.props.match.params.id);
                })
                    .catch(function (error) {
                    message.error(error.message);
                    _this.props.closeRecentModal();
                });
            }, undefined, function () {
                _this.props.closeRecentModal();
            }, undefined, undefined);
            _this.props.addNewModal(modalInfo);
        };
        return _this;
    }
    CommissionMembersList.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        this.fetchCommission(id);
    };
    CommissionMembersList.prototype.render = function () {
        var _a = this.props, commission = _a.commission, fetchSingleCommissionStatus = _a.fetchSingleCommissionStatus, header = _a.header, match = _a.match;
        var id = match.params.id;
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FETCHING) {
            return React.createElement(ContentLayout, { contentName: "\u0427\u043B\u0435\u043D\u044B \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" });
        }
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.IDLE) {
            return null;
        }
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FAILED) {
            var modalInfo_1 = CreateOkModalInfo('Ошибка при загрузке комиссии', 'Комиссия не найдена', function () {
                dispatchCloseRecentModal();
                getHistory().push(buildAppRoute(getAppRoute(), '/commissions/all'));
            }, undefined, false);
            setTimeout(function () {
                dispatchClearFetchEntityStatus();
                dispatchAddNewModal(modalInfo_1);
            }, 0);
            return null;
        }
        var contentNode = commission && (React.createElement(Table, { columns: getColumns(id, this.onDeleteCommissionMember), dataSource: commission.meetingMembers, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'commissions',
                breadcrumbName: 'Комиссии',
            },
            {
                path: id + "/members",
                breadcrumbName: 'Члены комиссии',
            },
        ];
        var buttons = [
            {
                text: 'Добавить члена комиссии',
                onClick: function () { return getHistory().push(buildAppRoute(getAppRoute(), "/commissions/" + id + "/members/new")); },
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, buttons: buttons }, contentNode));
    };
    return CommissionMembersList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        commission: state.businessDataState.commissionsData.currentCommission,
        fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCommissionById: function (id) { return dispatch(fetchSingleCommission(id)); },
        addNewModal: function (modalInfo) { return dispatch(addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(closeRecentModal(numberToClose)); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommissionMembersList);
//# sourceMappingURL=CommissionMembersList.js.map