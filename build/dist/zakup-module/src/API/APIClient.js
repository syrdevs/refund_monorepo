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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { message } from 'antd';
import axios from 'axios';
import { getHistory } from '../Redux/history';
import { callAppFunction, requestFinished, requestStarted } from '../utils';
var mime = require('mime-types');
var baseUrl = 'http://185.27.192.177:6307/api';
var APIClient = /** @class */ (function () {
    function APIClient() {
    }
    APIClient.doApiCall = function (url, method, data, params, tokenRequired, contentType, responseType) {
        if (tokenRequired === void 0) { tokenRequired = true; }
        return __awaiter(this, void 0, void 0, function () {
            var origin_1, headers, authToken, formattedUrl, requestObj;
            return __generator(this, function (_a) {
                if (!url || url.length === 0) {
                    throw new Error('No URL provided');
                }
                if (!baseUrl) {
                    origin_1 = window.location.origin;
                    if (!origin_1 || origin_1.length === 0) {
                        throw new Error('Cannot parse current url');
                    }
                    if (origin_1[origin_1.length - 1] === '/') {
                        origin_1 = origin_1.substr(0, origin_1.length - 1);
                    }
                    baseUrl = origin_1 + "/api";
                }
                headers = {};
                if (tokenRequired) {
                    authToken = callAppFunction('getAuthToken');
                    if (!authToken) {
                        console.log('No auth token provided');
                        getHistory().push('/login');
                    }
                    headers['Authorization'] = "Bearer " + authToken;
                }
                if (data) {
                    headers['Content-Type'] = contentType || 'application/json; charset=UTF-8';
                }
                formattedUrl = baseUrl + (url[0] !== '/' ? "/" + url : url);
                requestObj = {
                    method: data && !method ? 'post' : method || 'get',
                    url: formattedUrl,
                    data: data,
                    params: params,
                    headers: headers,
                    responseType: responseType,
                };
                // tslint:disable-next-line:no-string-literal
                if (axios.interceptors.request['handlers'].length === 0) {
                    axios.interceptors.request.use(function (config) {
                        requestStarted();
                        return config;
                    });
                }
                // tslint:disable-next-line:no-string-literal
                if (axios.interceptors.response['handlers'].length === 0) {
                    axios.interceptors.response.use(function (response) {
                        requestFinished();
                        return response;
                    }, function (error) {
                        requestFinished();
                        if (error.response && error.response.status === 401) {
                            message.error(error.response.statusText);
                            getHistory().push('/login');
                        }
                        return Promise.reject(error);
                    });
                }
                return [2 /*return*/, axios(requestObj).catch(function (error) {
                        // tslint:disable-next-line:no-console
                        console.log(error);
                        if (error.response && error.response.status === 401) {
                            message.error(error.response.statusText);
                            getHistory().push('/login');
                        }
                        throw error;
                    })];
            });
        });
    };
    APIClient.prototype.fetchDict = function (dictName, dictAlias, sortNeeded) {
        if (sortNeeded === void 0) { sortNeeded = true; }
        var data = {
            start: 0,
            length: 100000,
            entity: dictName,
        };
        if (sortNeeded) {
            data['sort'] = [
                {
                    field: 'code',
                },
            ];
        }
        return APIClient.doApiCall('/uicommand/getList', 'POST', data);
    };
    APIClient.prototype.fetchNotices = function (page, pageSize) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: page,
            length: pageSize,
            entity: 'notice',
            sort: [
                {
                    field: 'dateBegin',
                    desc: true,
                },
            ],
        });
    };
    APIClient.prototype.fetchNotice = function (id) {
        return APIClient.doApiCall('/uicommand/getObject', 'POST', {
            id: id,
            entity: 'notice',
        });
    };
    APIClient.prototype.saveNotice = function (notice) {
        var data = {
            noticeType: {
                id: notice.name,
            },
            region: {
                id: notice.region,
            },
            periodYear: {
                id: notice.periodYear,
            },
            noticeMedicalTypes: notice.noticeMedicalTypes,
            noticeMedicalForms: notice.noticeMedicalForms,
            dateBegin: notice.dateBegin.format('DD.MM.YYYY HH:mm'),
            dateEnd: notice.dateEnd.format('DD.MM.YYYY HH:mm'),
        };
        if (notice.id) {
            data['id'] = notice.id;
        }
        var request = {
            entity: 'notice',
            alias: null,
            data: data,
        };
        return APIClient.doApiCall('/uicommand/saveObject', 'POST', request);
    };
    APIClient.prototype.createProtocol = function (noticeId) {
        return APIClient.doApiCall('/contract/createPlanProtocolByNotice', 'POST', {
            noticeId: noticeId,
        });
    };
    APIClient.prototype.fetchCommissions = function () {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: 0,
            length: 1000,
            entity: 'meeting',
            alias: 'meetingList',
        });
    };
    APIClient.prototype.fetchSingleCommission = function (id) {
        return APIClient.doApiCall('/uicommand/getObject', 'POST', {
            start: 0,
            length: 1000,
            entity: 'meeting',
            id: id,
        });
    };
    APIClient.prototype.saveCommission = function (commission) {
        var data = {
            region: {
                id: commission.region,
            },
            dateBegin: commission.dateBegin,
            meetingMembers: commission.meetingMembers,
        };
        if (commission.id) {
            data['id'] = commission.id;
        }
        var request = {
            entity: 'meeting',
            alias: null,
            data: data,
        };
        return APIClient.doApiCall('/uicommand/saveObject', 'POST', request);
    };
    APIClient.prototype.deleteCommissionMember = function (id) {
        var data = {
            entity: 'meetingMember',
            alias: null,
            id: id,
        };
        return APIClient.doApiCall('/uicommand/deleteObject', 'POST', data);
    };
    APIClient.prototype.findPersonByIIN = function (iin) {
        return APIClient.doApiCall('/contract/getPersonByIIN', 'GET', null, { iin: iin });
    };
    APIClient.prototype.fetchApplications = function (page, pageSize) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: page,
            length: pageSize,
            entity: 'app',
            alias: 'appList',
        });
    };
    APIClient.prototype.fetchApplicationById = function (id) {
        return APIClient.doApiCall('/uicommand/getObject', 'POST', {
            entity: 'app',
            alias: null,
            id: id,
        });
    };
    APIClient.prototype.saveApplication = function (application) {
        var request = {
            entity: 'app',
            alias: null,
            data: __assign({}, application, { applicationItems: application.applicationItems.map(function (i) { return (__assign({}, i)); }) }),
        };
        return APIClient.doApiCall('/uicommand/saveObject', 'POST', request);
    };
    APIClient.prototype.fetchProposals = function (page, pageSize, noticeId) {
        var data = {
            start: page,
            length: pageSize,
            entity: 'proposal',
            alias: 'proposalList',
        };
        if (noticeId) {
            data['filter'] = {
                'notice.id': noticeId,
            };
        }
        return APIClient.doApiCall('/uicommand/getList', 'POST', data);
    };
    APIClient.prototype.fetchProposalById = function (id) {
        return APIClient.doApiCall('/uicommand/getObject', 'POST', {
            entity: 'proposal',
            alias: null,
            id: id,
        });
    };
    APIClient.prototype.saveProposal = function (proposal) {
        var request = {
            entity: 'proposal',
            alias: null,
            data: proposal,
        };
        return APIClient.doApiCall('/uicommand/saveObject', 'POST', request);
    };
    APIClient.prototype.fetchProtocols = function (page, pageSize, filter) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: page,
            length: pageSize,
            entity: 'planProtocol',
            alias: 'planProtocolList',
            filter: filter,
        });
    };
    APIClient.prototype.fetchProtocolById = function (id) {
        return APIClient.doApiCall('/uicommand/getObject', 'POST', {
            entity: 'planProtocol',
            alias: 'planProtocolList',
            id: id,
        });
    };
    APIClient.prototype.fetchProtocolActivityGroupInfos = function (planProtocolId) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: 0,
            length: 100000,
            entity: 'planProtocolActivity',
            filter: {
                planProtocolId: planProtocolId,
            },
            sort: [
                {
                    field: 'activity.code',
                },
                {
                    field: 'activity.name',
                },
            ],
        });
    };
    APIClient.prototype.fetchProtocolActivityMeasureUnits = function (planProtocolId, activityId) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: 0,
            length: 200,
            entity: 'planProtocolColumns',
            filter: {
                planProtocolId: planProtocolId,
                activityId: activityId,
            },
        });
    };
    APIClient.prototype.fetchProtocolItems = function (planProtocolId, activityId, page, pageSize) {
        return APIClient.doApiCall('/uicommand/getList', 'POST', {
            start: page,
            length: pageSize,
            entity: 'planProtocolItem',
            filter: {
                'activity.id': activityId,
                planProtocolId: planProtocolId,
            },
            sort: [
                {
                    field: 'clinic.shortName',
                },
            ],
        });
    };
    APIClient.prototype.deleteApplication = function (id) {
        return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
            entity: 'app',
            id: id,
        });
    };
    APIClient.prototype.acceptApplication = function (id) {
        return APIClient.doApiCall("/contract/registerClinic?entity=app&applicationId=" + id, 'GET');
    };
    APIClient.prototype.declineApplication = function (id, rejectText) {
        return Promise.resolve();
    };
    APIClient.prototype.deleteProposal = function (id) {
        return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
            entity: 'proposal',
            id: id,
        });
    };
    APIClient.prototype.acceptProposal = function (id) {
        return Promise.resolve();
    };
    APIClient.prototype.declineProposal = function (id, rejectText) {
        return Promise.resolve();
    };
    APIClient.prototype.savePlanProtocolItem = function (item) {
        return APIClient.doApiCall('/uicommand/saveObject', 'POST', {
            entity: 'planProtocolItem',
            alias: null,
            data: item,
        });
    };
    APIClient.prototype.downloadFile = function (id) {
        return APIClient.doApiCall('/uicommand/downloadFile', 'POST', {
            entity: 'documentAttachment',
            id: id,
        });
    };
    APIClient.prototype.uploadFile = function (entity, id, doc) {
        var formData = new FormData();
        formData.append('entity', entity);
        formData.append('path', 'documentAttachments');
        formData.append('id', id);
        formData.append('filedata', JSON.stringify({
            entity: 'documentAttachment',
            alias: null,
            data: { fileDescription: doc.fileDescription, attachmentType: { id: doc.attachmentType.id } },
        }));
        formData.append('content', doc.file);
        return APIClient.doApiCall('/uicommand/uploadFile', 'POST', formData);
    };
    APIClient.prototype.deleteFile = function (id) {
        return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
            entity: 'documentAttachment',
            id: id,
        });
    };
    APIClient.prototype.getCommands = function (entity) {
        return APIClient.doApiCall("/uicommand/getCommands?entity=" + entity + "&context=");
    };
    APIClient.prototype.runCommand = function (commandId, objIds, isReport) {
        console.log(isReport);
        var resp = APIClient.doApiCall('/uicommand/runCommand', 'POST', { id: commandId, parameters: [], obj_ids: objIds }, undefined, undefined, undefined, isReport ? 'blob' : undefined);
        if (isReport) {
            resp.then(function (data) {
                var contentType = data.headers['content-type'];
                var fileExtension = mime.extension(contentType);
                var fileName = "Report." + fileExtension;
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(data.data);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }
        return resp;
    };
    APIClient.prototype.publishProtocol = function (id) {
        return APIClient.doApiCall("/contract/publishDocument?entity=planProtocol&id=" + id);
    };
    return APIClient;
}());
export default APIClient;
//# sourceMappingURL=APIClient.js.map