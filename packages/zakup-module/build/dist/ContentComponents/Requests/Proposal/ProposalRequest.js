"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var moment_1 = __importDefault(require("moment"));
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var businessDataStateActions_1 = require("../../../Redux/Actions/businessDataStateActions");
var history_1 = require("../../../Redux/history");
var utils_1 = require("../../../utils");
var shared_1 = require("../../shared");
var DocumentAttachments_1 = __importDefault(require("../DocumentAttachments"));
var ProposalRequestActivitiesTable_1 = __importDefault(require("./ProposalRequestActivitiesTable"));
var ProposalRequestInternalForm_1 = __importDefault(require("./ProposalRequestInternalForm"));
var TabPane = antd_1.Tabs.TabPane;
var initialValues = {
    number: '',
    descr: '',
    documentDate: moment_1.default(),
    periodYear: undefined,
    clinic: undefined,
    region: undefined,
    proposalType: undefined,
};
var ProposalRequest = /** @class */ (function (_super) {
    __extends(ProposalRequest, _super);
    function ProposalRequest(props) {
        var _this = _super.call(this, props) || this;
        _this.onCommandClick = function (commandId, isReport) {
            utils_1.createApiClient().runCommand(commandId, [_this.props.id], isReport);
        };
        _this.getObjectById = function (id) {
            utils_1.createApiClient()
                .fetchProposalById(id)
                .then(function (_a) {
                var data = _a.data;
                var proposal = {
                    id: data.id,
                    descr: data.descr,
                    number: data.number,
                    documentDate: moment_1.default(data.documentDate, 'DD.MM.YYYY'),
                    periodYear: data.periodYear,
                    clinic: data.clinic,
                    proposalType: data.proposalType,
                    region: data.region,
                };
                var proposalItems = data.proposalItems
                    ? data.proposalItems.map(function (i) { return ({
                        id: i.id,
                        activity: {
                            id: i.activity.id,
                            name: i.activity.name,
                        },
                        proposalItemValues: i.proposalItemValues,
                    }); })
                    : [];
                _this.setState({
                    fields: _this.convertPropsToEntityDataForState(proposal),
                    proposalItems: proposalItems,
                    attachments: data.documentAttachments,
                    originalAttachments: data.documentAttachments,
                    fetched: true,
                    notice: {
                        name: data.notice.noticeType.nameRu,
                    },
                });
            });
        };
        _this.onDelete = function (doc) {
            var newDocs = _this.state.attachments.filter(function (i) { return i.attachmentType.id !== doc.attachmentType.id; });
            _this.setState({
                attachments: newDocs,
                valid: true,
            });
        };
        _this.clearCurrentUploadInfo = function () {
            _this.setState({
                docComment: undefined,
                docType: undefined,
                file: undefined,
            });
        };
        _this.onUploadFile = function () {
            var _a = _this.state, file = _a.file, docType = _a.docType, docComment = _a.docComment;
            var newAttachments = __spread(_this.state.attachments, [
                {
                    name: file.name,
                    filename: file.name,
                    fileDescription: docComment,
                    attachmentType: __assign({}, _this.props.attachmentTypesDict.find(function (i) { return i.id === docType; })),
                    file: file,
                },
            ]);
            _this.setState({
                attachments: newAttachments,
                valid: true,
            });
        };
        _this.onDocumentAttachmentsChange = function (docType, docComment, file) {
            _this.setState({
                docType: docType,
                docComment: docComment,
                file: file,
            });
        };
        _this.onSendToReview = function () {
            // doSend
            antd_1.message.success('Заявка отправлена на рассмотрение');
        };
        _this.onProposalItemValueChange = function (updatedProposalItems) {
            _this.setState({
                proposalItems: updatedProposalItems,
                valid: true,
            });
        };
        _this.handleSubmit = function (form) { return function (e) {
            e.preventDefault();
            form.validateFields(function (err, values) {
                if (!err) {
                    var id_1 = _this.props.id;
                    var dataToSave = __assign({}, values, { id: id_1 === 'new' ? undefined : id_1, documentDate: values['documentDate'].format('DD.MM.YYYY'), periodYear: {
                            id: values['periodYear'],
                        }, clinic: {
                            id: values['clinic'],
                        }, region: {
                            id: values['region'],
                        }, proposalType: {
                            id: values['proposalType'],
                        }, documentAttachments: __spread(_this.state.originalAttachments), proposalItems: _this.state.proposalItems.map(function (i) { return ({
                            id: i.id,
                            activity: {
                                id: i.activity.id,
                            },
                            proposalItemValues: i.proposalItemValues
                                ? i.proposalItemValues.map(function (k) { return ({
                                    id: k.id,
                                    measureUnit: {
                                        id: k.measureUnit.id,
                                    },
                                    value: k.value,
                                }); })
                                : undefined,
                        }); }) });
                    if (_this.state.noticeId) {
                        dataToSave['notice'] = {
                            id: _this.state.noticeId,
                        };
                    }
                    if (_this.state.regionId) {
                        dataToSave['region'] = {
                            id: _this.state.regionId,
                        };
                    }
                    if (_this.state.periodYearId) {
                        dataToSave['periodYear'] = {
                            id: _this.state.periodYearId,
                        };
                    }
                    var apiClient_1 = utils_1.createApiClient();
                    apiClient_1
                        .saveProposal(dataToSave)
                        .then(function (resp) {
                        var newId = id_1 === 'new' ? resp.data.id : id_1;
                        var _a = _this.state, attachments = _a.attachments, originalAttachments = _a.originalAttachments;
                        var filesToDelete = originalAttachments.filter(function (i) { return attachments.findIndex(function (k) { return k.id === i.id; }) === -1; });
                        var filesToUpload = attachments.filter(function (i) { return originalAttachments.findIndex(function (k) { return k.id === i.id; }) === -1; });
                        var fileToDeletePromises = filesToDelete.map(function (i) { return apiClient_1.deleteFile(i.id); });
                        var fileToUploadPromises = filesToUpload.map(function (i) { return apiClient_1.uploadFile('proposal', newId, i); });
                        Promise.all(__spread(fileToDeletePromises, fileToUploadPromises)).then(function () {
                            antd_1.message.success('Заявка сохранена!');
                            history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), "/requests/proposals/" + newId));
                        });
                    })
                        .catch(function (error) { return antd_1.message.error('Ошибка при сохранении заявки'); });
                }
            });
        }; };
        _this.handleFormChange = function (changedFields) {
            var data = _this.handleSelectValueChanged(changedFields);
            var isValid = true;
            for (var field in data) {
                if (data.hasOwnProperty(field)) {
                    if (data[field].errors && Array.isArray(data[field].errors) && data[field].errors.length > 0) {
                        isValid = false;
                        break;
                    }
                }
            }
            _this.setState(function (_a) {
                var fields = _a.fields;
                return ({
                    fields: __assign({}, fields, _this.handleSelectValueChanged(changedFields)),
                    valid: isValid,
                });
            });
        };
        _this.handleSelectValueChanged = function (changedFields) {
            var e_1, _a;
            var fieldsWithSelect = ['periodYear', 'clinic', 'region', 'proposalType'];
            var rightFieldsData = __assign({}, changedFields);
            try {
                for (var fieldsWithSelect_1 = __values(fieldsWithSelect), fieldsWithSelect_1_1 = fieldsWithSelect_1.next(); !fieldsWithSelect_1_1.done; fieldsWithSelect_1_1 = fieldsWithSelect_1.next()) {
                    var f = fieldsWithSelect_1_1.value;
                    if (changedFields.hasOwnProperty(f)) {
                        rightFieldsData[f] = __assign({}, changedFields[f], { value: _this.extractDictionaryValue(f, changedFields[f].value) });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fieldsWithSelect_1_1 && !fieldsWithSelect_1_1.done && (_a = fieldsWithSelect_1.return)) _a.call(fieldsWithSelect_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return rightFieldsData;
        };
        _this.extractDictionaryValue = function (fieldName, value, multi) {
            if (multi === void 0) { multi = false; }
            var dictPropsName = "" + fieldName + (multi ? '' : 's') + "Dict";
            var allDictData = _this.props[dictPropsName];
            if (!allDictData) {
                allDictData = _this.state[dictPropsName];
            }
            if (!value) {
                return multi ? [] : undefined;
            }
            if (multi) {
                return allDictData.filter(function (i) { return value.indexOf(i.id) > -1; });
            }
            var data = allDictData.filter(function (i) { return i.id === value; });
            return data.length ? data[0] : undefined;
        };
        var thisState = {
            fields: _this.convertPropsToEntityDataForState(initialValues),
            valid: false,
            activities: [],
            periodYearsDict: [],
            clinicsDict: [],
            proposalItems: [],
            attachments: [],
            originalAttachments: [],
            fetched: _this.props.id === 'new',
            notice: undefined,
        };
        if (props.id === 'new') {
            var noticeId = localStorage.getItem('noticeId');
            var regionId = localStorage.getItem('regionId');
            var periodYearId = localStorage.getItem('periodYearId');
            localStorage.removeItem('noticeId');
            localStorage.removeItem('regionId');
            localStorage.removeItem('periodYearId');
            if (noticeId && regionId) {
                thisState['noticeId'] = noticeId;
                thisState['regionId'] = regionId;
                thisState['periodYearId'] = periodYearId;
            }
            else {
                history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/notices/all'));
            }
        }
        _this.state = thisState;
        return _this;
    }
    ProposalRequest.prototype.componentDidMount = function () {
        var _this = this;
        var apiClient = utils_1.createApiClient();
        apiClient.fetchDict('activity', undefined, false).then(function (r) {
            _this.setState({
                activities: r.data.content.map(function (i) { return ({
                    id: i.id,
                    name: i.name,
                    code: i.code,
                    activityMeasureUnits: i.activityMeasureUnits.map(function (k) { return ({
                        id: k.measureUnit.id,
                        nameRu: k.measureUnit.nameRu,
                        nameKz: k.measureUnit.nameKz,
                        code: k.measureUnit.code,
                    }); }),
                }); }),
            });
        });
        apiClient.fetchDict('periodYear', undefined, false).then(function (r) {
            _this.setState({
                periodYearsDict: r.data.content,
            });
        });
        apiClient.fetchDict('clinic', undefined, false).then(function (r) {
            _this.setState({
                clinicsDict: r.data.content,
            });
        });
        this.props.fetchCustomDict(['measureUnit', 'region', 'proposalType', 'attachmentType']);
        var id = this.props.id;
        if (id !== 'new') {
            this.getObjectById(id);
        }
    };
    ProposalRequest.prototype.render = function () {
        var _a = this.state, fetched = _a.fetched, fields = _a.fields, valid = _a.valid, periodYearsDict = _a.periodYearsDict, activities = _a.activities, clinicsDict = _a.clinicsDict, notice = _a.notice;
        var _b = this.props, regionsDict = _b.regionsDict, proposalTypesDict = _b.proposalTypesDict, attachmentTypesDict = _b.attachmentTypesDict;
        var header = 'Заявка на объемы';
        if (!attachmentTypesDict.length ||
            !periodYearsDict.length ||
            !activities.length ||
            !regionsDict.length ||
            !proposalTypesDict.length ||
            !clinicsDict.length ||
            !fetched) {
            return React.createElement(shared_1.ContentLayout, { contentName: header });
        }
        var id = this.props.id;
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'requests/proposals/all',
                breadcrumbName: 'Заявки на объемы',
            },
            {
                path: id,
                breadcrumbName: id === 'new' ? 'Новая заявка' : 'Заявка',
            },
        ];
        if (id !== 'new') {
            var noticeInfo = notice ? " \u041F\u043E\u0434\u0430\u043D\u0430 \u043D\u0430 " + notice.name + "." : '';
            header = "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043E\u0431\u044A\u0435\u043C\u044B #" + fields.number.value + " \u043E\u0442 " + fields.documentDate.value.format('DD.MM.YYYY') + ". \u0420\u0435\u0433\u0438\u043E\u043D: " + fields.region.value.nameRu + "." + noticeInfo;
        }
        else {
            header = 'Новая заявка на объемы';
        }
        return (React.createElement(shared_1.ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, entity: "proposal", disableCommands: id === 'new', showCommands: true, onCommandClick: this.onCommandClick },
            React.createElement(antd_1.Tabs, { tabPosition: "left", size: "small" },
                React.createElement(TabPane, { tab: "\u0422\u0438\u0442\u0443\u043B\u044C\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u044C", key: "1" },
                    React.createElement(ProposalRequestInternalForm_1.default, __assign({}, fields, { valid: valid, isNew: id === 'new', regionId: this.state.regionId, periodYearId: this.state.periodYearId, hasItems: this.state.proposalItems.length > 0, onChange: this.handleFormChange, handleSubmit: this.handleSubmit, periodYearsDict: this.state.periodYearsDict, clinicsDict: this.state.clinicsDict, regionsDict: this.props.regionsDict, proposalTypesDict: this.props.proposalTypesDict, onSendToReview: this.onSendToReview }))),
                React.createElement(TabPane, { tab: "\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F", key: "2" },
                    React.createElement(ProposalRequestActivitiesTable_1.default, { allActivities: this.state.activities, proposalItems: this.state.proposalItems, onProposalItemValueChange: this.onProposalItemValueChange })),
                React.createElement(TabPane, { tab: "\u0424\u0430\u0439\u043B\u044B", key: "3" },
                    React.createElement(DocumentAttachments_1.default, { docs: this.state.attachments, docType: this.state.docType, docComment: this.state.docComment, file: this.state.file, attachmentTypesDict: this.props.attachmentTypesDict, onChange: this.onDocumentAttachmentsChange, onUpload: this.onUploadFile, onDelete: this.onDelete, clearCurrentUploadInfo: this.clearCurrentUploadInfo })))));
    };
    ProposalRequest.prototype.componentWillReceiveProps = function (nextProps) {
        var id = nextProps.id;
        if (id !== 'new') {
            this.getObjectById(id);
            this.setState({
                valid: false,
            });
        }
    };
    ProposalRequest.prototype.convertPropsToEntityDataForState = function (values) {
        return Object.keys(values).reduce(function (prev, curr) {
            var _a;
            return (__assign({}, prev, (_a = {}, _a[curr] = { value: values[curr] }, _a)));
        }, {});
    };
    return ProposalRequest;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        regionsDict: state.dictionariesDataState.region,
        proposalTypesDict: state.dictionariesDataState.proposalType,
        attachmentTypesDict: state.dictionariesDataState.attachmentType,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCustomDict: function (dictNames) { return dispatch(businessDataStateActions_1.fetchCustomDict(dictNames)); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProposalRequest);
//# sourceMappingURL=ProposalRequest.js.map