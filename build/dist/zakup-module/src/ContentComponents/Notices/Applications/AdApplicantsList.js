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
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchAdApplicants } from '../../../Redux/Actions/businessDataStateActions';
import { getHistory } from '../../../Redux/history';
import { getAppRoute } from '../../../utils';
import { ContentLayout } from '../../shared';
var getColumns = function (adId) {
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
            title: 'Наименование субъекта здравоохранения',
            dataIndex: 'name',
            sorter: function (a, b) { return a.name.localeCompare(b.name); },
            width: '70%',
        },
        {
            title: 'Представленные документы',
            dataIndex: 'id',
            render: function (data, originalRow) {
                return (React.createElement(Link, { to: {
                        pathname: buildAppRoute(getAppRoute(), "/notices/" + adId + "/applicants/" + originalRow.id.toString()),
                    } }, "\u041F\u0435\u0440\u0435\u0447\u0435\u043D\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"));
            },
        },
    ];
    return columns;
};
var AdApplicantsList = /** @class */ (function (_super) {
    __extends(AdApplicantsList, _super);
    function AdApplicantsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdApplicantsList.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        if (!id) {
            getHistory().push(buildAppRoute(getAppRoute(), '/notices/all/1'));
        }
        else {
            this.props.fetchAdApplicants(id);
        }
    };
    AdApplicantsList.prototype.render = function () {
        var _a = this.props, adApplicants = _a.adApplicants, header = _a.header;
        var adId = this.props.match.params.id;
        var contentNode = adApplicants && (React.createElement(Table, { columns: getColumns(adId), dataSource: adApplicants, rowKey: function (r) { return r.id.toString(); }, size: "middle", pagination: false }));
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'notices',
                breadcrumbName: 'Все объявления',
            },
            {
                path: adId,
                breadcrumbName: 'Объявление',
            },
            {
                path: 'applicants',
                breadcrumbName: 'Подавшие заявки',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes }, contentNode));
    };
    return AdApplicantsList;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        adApplicants: state.businessDataState.adApplicants,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchAdApplicants: function (id) { return dispatch(fetchAdApplicants(id)); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdApplicantsList));
//# sourceMappingURL=AdApplicantsList.js.map