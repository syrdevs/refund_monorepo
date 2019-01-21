import { stringify } from 'qs';
import request from '../utils/request';

function sleepF(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

export async function getReference(params) {
  return request('/api/dictionaryListByName?name=' + params.code);
}

export async function getColumns(params) {
  return request(`/apis/refund/${params.payload.table}column`);
}

export async function addSpecial(params) {
  return request(`/api/refund/addSpecial?iin=`+params.payload);

}

export async function getData(params) {
  if (['payment', 'paymentcolumn', 'templates', 'journaldata', 'journal'].indexOf(params.payload.table) !== -1) {
    return request(`/apis/refund/${params.payload.table}data`);
  }

  return request(`/api/refund/${params.payload.table}`, {
    method: 'POST',
    body: params.payload,
  });
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function getList(params) {
  return request('/api/uicommand/getList', {
    method: 'POST',
    body: params.payload,
  });
}

export async function paymentsData(params) {
  return request('/api/uicommand/getList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function LoginUser(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function LogoutUser() {
  return request('/api/logout', {
    method: 'POST',
  });
}

export async function CheckToken(params) {
  return request('/api/CheckToken');
}

export async function setRefundStatus(params) {
  return request('/api/refund/refundStatus', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getmainViewTable(params) {
  return request('/api/refund/getRefundPage', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getmainViewColumn(params) {
  return request('/api/refund/maindata');
}

export async function getRPMUTable(params) {
  return request('/api/refund/paymentByRefundId', {
    method: 'POST',
    body: params.payload,
  });
}

export async function dAppRefundStatusAuto(params) {
  return request('/api/refund/dAppRefundStatusAuto', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getMainModal(params) {
  return request('/api/refund/mainmodal');
}

export async function getMainSelect1(params) {
  return request('/api/refund/mainselect1');
}
export async function setAccept(params) {
  return request('/api/refund/setAcceptToRefund', {
    method: 'POST',
    body: params.payload,
  });
}
export async function setRefundNeedAcceptUser(params) {
  return request('/api/refund/setRefundNeedAcceptUser', {
    method: 'POST',
    body: params.payload,
  });
}
export async function getUsers(params) {
  console.log(params.payload);
  return request('api/uicommand/getList', {
    method: 'POST',
    body: params.payload,
  });
}
export async function createRefunkPack(params) {

  return request('/api/refund/createRefundPack', {
    method: 'POST',
    body: params.payload,
  });
}


export async function getOptionsdata(params) {
  return request('/api/refund/getUserOptionList');
}

export async function saveOptionsdata(params) {
  return request('/api/refund/saveUserOptionList', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getFilesRequest(params) {
  return request('/api/refund/upload/application/get/' + params.payload.id);
}

export async function deleteFileRequest(params) {
  return request('/api/refund/upload/application/remove/' + params.payload.id, {
    method: 'POST',
  });
}

export async function setDateRefund(params) {
  return request('/api/refund/refundSetDate', {
    method: 'POST',
    body: params.payload,
  });
}

export async function setDateRequest(params) {
  return request('/api/refund/applicationSetDate', {
    method: 'POST',
    body: params.payload,
  });
}

export async function setfile(params) {

  let formData = new FormData();
  formData.append('file', params.payload.file);

  return request('/api/refund/upload/application/add/' + params.payload.id, {
    method: 'POST',
    body: formData,
  });
}

export async function getmt102file(params) {
  return request('/api/refund/getfile');
}

export async function mt102preview(params) {
  return request('/api/refund/mt102GroupByKnpPreview', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getCalendarEvents(params) {
  return request(`/api/refund/getCalendarEvents?${stringify(params.payload)}`);
}

export async function saveCalendarEvents(params) {
  return request('/api/refund/saveCalendarEvent', {
    method: 'POST',
    body: params.payload,
  });
}

export async function removeCalendarEvents(params) {
  return request(`/api/refund/removeCalendarEvent?${stringify(params.payload)}`, {
    method: 'POST',
  });
}

export async function getJournalData(params) {
  return request('/api/refund/getRefundHisPage', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getStaticticsData(params) {
  //console.log(`/api/refund/get/stat?${stringify(params.payload)}`)
  return request(`/api/refund/get/stat?${stringify(params.payload)}`);
}

export async function getReceiversRefund(params) {
  return request('/api/uicommand/runCommand', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getReportsList(params) {
  return request('/api/report/getReportList');
}

export async function getReportParameters(params) {
  return request(`/api/report/getReportParameters?${stringify(params.payload)}`);
}

export async function getFormedReports(params) {
  return request('/api/uicommand/getList', {
    method: 'POST',
    body: params.payload,
  });
}


export async function getSearcherCalendar(params) {
  return request('/api/rpmu/personPeriodList', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getSearcherJurCalendar(params) {
  return request('/api/rpmu/senderPeriodList', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getSearcherData(params) {
  return request('/api/external/gbdflGetPerson', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getSearcherRPNData(params) {
  return request('/api/external/rpnGetPerson', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getSearcherMEDData(params) {
  return request('/api/external/medInfGetPerson', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getSearcherJur(params) {
  return request('/api/external/rpmuGetSender', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getActDics(params) {
  return request('/api/uicommand/getList', {
    method: 'POST',
    body: params.payload,
  });
}

export async function saveObject(params) {
  return request('/api/uicommand/saveObject', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getObject(params) {
  return request('/api/uicommand/getObject', {
    method: 'POST',
    body: params.payload,
  });
}

export async function createContractFromAgent(params) {
  return request('/api/contract/createContractFromAgent', {
    method: 'POST',
    body: params.payload,
  });
}

export async function createSubContract(params) {
  return request('/api/contract/createSubContract', {
    method: 'POST',
    body: params.payload,
  });
}

export async function createActForContract(params) {
  return request('/api/contract/createActForContract', {
    method: 'POST',
    body: params.payload,
  });
}
export async function uploadFile(params) {
  return request('/api/uicommand/uploadFile', {
    method: 'POST',
    body: params.payload,
  });
}
export async function deleteObject(params) {
  return request('/api/uicommand/deleteObject', {
    method: 'POST',
    body: params.payload,
  });
}

export async function getCommands(params) {
  return request(`/api/uicommand/getCommands?${stringify(params.payload)}`);
}
export async function getPublish(params) {
  return request("/api/contract/publishDocument?entity=contract&id="+params.payload.id);
}


