import {
  getmainViewTable,
  getmainViewColumn,
  getRPMUTable,
  getMainModal,
  getMainSelect1,
  getOptionsdata,
  setfile,
  getmt102file,
  mt102preview,
  setRefundStatus,
  getFilesRequest,
  deleteFileRequest,
  setDateRequest,
  dAppRefundStatusAuto,
  setDateRefund,
  saveOptionsdata,
  getReceiversRefund,
  paymentsData,
  getSearcherCalendar,
  getSearcherData,
  getSearcherJur,
  getSearcherJurCalendar,
  getSearcherRPNData,
  getSearcherMEDData,
  getActDics,
  saveObject,
  getObject,
  createContractFromAgent,
  createActForContract,
  deleteObject,
  getList,
  getCommands,
  createSubContract, setAccept,
  createRefunkPack, getUsers, setRefundNeedAcceptUser, publishing, reloadMt100Packet, rejectDocument
} from "../services/api";

export default {
  namespace: 'universal',
  state: {
    table: {
      number: null,
      size: null,
      totalElements: null,
      totalPages: null,
      content: [],
    },
    files: [],
    columns: [],
    rpmu: {
      columns: [],
      data: [],
    },
    mainmodal: [],
    select1: [],
    options: [],
    refundKnpList: [],
    modalgridviewdata: [],
    paymentsData: {
      mt100: {},
      mt102: {},
    },
    searcherdata: {},
    searcherRPNdata: {},
    searcherMEDdata: {},
    searcherjur: {},
    searchercalendar: [],
    searcherjurcalendar: [],
    periodYear: {},
    periodSection: {},
    organization: {},
    medicalType: {},
    attachmentType: {},
    paymentRequestType: {},
    divisions: {},
    activity: {},
    measureUnit: {},
    identifierType: {},
    currencyType: {},
    legalForm: {},
    saveanswer: {},
    getObjectData: {},
    counterAgentData: {},
    uploadanswer: {},
    commandResult: [],
    users:{},
    publishanswer: {},
    reloadMt100Packet: {},
    rejectDocument: {}
  },
  effects: {
    * getCommandResult(payload, { call, put }) {

      const response = yield call(getCommands, payload);

      yield put({
        type: 'getCommandResultReducer',
        payload: response,
      });
    },
    * receiversRefund(payload, { call, put }) {
      yield  call(getReceiversRefund, payload);
    },
    * AppRefundStatusAuto(payload, { call, put }) {
      yield call(dAppRefundStatusAuto, payload);
    },
    * removeFileRequest(payload, { call }) {
      yield call(deleteFileRequest, payload);
    },
    * getFilesRequestDate(payload, { call, put }) {
      const response = yield call(getFilesRequest, payload);

      yield put({
        type: 'files',
        payload: response,
      });
    },
    * changeRefundStatus(payload, { call }) {
      yield call(setRefundStatus, payload);
    },
    * changeDateRefund(payload, { call }) {
      yield call(setDateRefund, payload);
    },
    * changeDateRequest(payload, { call }) {
      yield call(setDateRequest, payload);
    },
    * setfile(payload, { call, put }) {

      const response = yield call(setfile, payload);

      yield put({
        type: 'setfileReduce',
        payload: response,
      });
    },
    * paymentsData(payload, { call, put }) {
      const response = yield call(paymentsData, payload.payload);
      yield put({
        type: 'paymentsDataReducer',
        payload: {
          type: payload.payload.entity,
          response: response || {},
        },
      });
    },
    * getmt102(payload, { call, put }) {
      const response = yield call(getmt102file, payload);

      yield put({
        type: 'mt102',
        payload: response,
      });
    },
    * mt102preview(payload, { call, put }) {
      const response = yield call(mt102preview, payload);
      yield put({
        type: 'mt102prevReducer',
        payload: response,
      });

      /*if (response.refundKnpList.length > 0) {
        payload.payload.searched = true;
        payload.payload.data['knpList'] = {
          id: response.refundKnpList[0].id,
        };
        payload.payload = {
          "entity": "Refund",
          "start": 0,
          "length": 15,
          "sort": [],
          "filter": payload.payload
        }
        console.log(payload);
        //const data = yield call(getmainViewTable, payload);
        const data = yield call(getList, payload);
        yield put({
          type: 'mt102dataReducer',
          payload: data,
        });
      }*/
    },
    * mt102view(payload, { call, put }) {
      const data = yield call(getList, payload);
      yield put({
        type: 'mt102dataReducer',
        payload: data,
      });
    },
    * mainviewtable(payload, { call, put }) {
      const response = yield call(getmainViewTable, payload);

      yield put({
        type: 'maintable',
        payload: response,
      });
    },
    * mainviewcolumn(payload, { call, put }) {
      const response = yield call(getmainViewColumn, payload);

      yield put({
        type: 'maincolumn',
        payload: response,
      });
    },
    * rpmuTable(payload, { call, put }) {
      const response = yield call(getRPMUTable, payload);

      yield put({
        type: 'rpmuReduce',
        payload: response,
      });
    },
    * mainModal(payload, { call, put }) {
      const response = yield call(getMainModal, payload);

      yield put({
        type: 'mainModalReducer',
        payload: response,
      });
    },
    * mainSelect1(payload, { call, put }) {
      const response = yield call(getMainSelect1, payload);

      yield put({
        type: 'mainSelect1Reduce',
        payload: response,
      });
    },
    * setAcceptToRefunds(payload, { call, put }) {
      const response = yield call(setAccept, payload);
      yield put({
        type: 'setAcceptToRefundReducer',
        payload: response,
      });
    },

    * setRefundNeedAcceptUser(payload, { call, put }) {
      const response = yield call(setRefundNeedAcceptUser, payload);
      yield put({
        type: 'setRefundNeedAcceptUserReducer',
        payload: response,
      });
    },
    * getUsers(payload, { call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'getUsersReducer',
        payload: response,
      });
    },
    * createPack(payload, { call, put }) {
      const response = yield call(createRefunkPack, payload);
      yield put({
        type: 'createRefunkPackReducer',
        payload: response,
      });
    },
    * optionsData(payload, { call, put }) {
      const response = yield call(getOptionsdata, payload);
      yield put({
        type: 'OptionReducer',
        payload: response || [],
      });
    },
    * optionsDatachange(payload, { call, put }) {
      const response = yield call(saveOptionsdata, payload);
      yield put({
        type: 'OptionChangeReducer',
        payload: payload,
      });
    },
    * SearcherCalendar(payload, { call, put }) {
      const response = yield call(getSearcherCalendar, payload);
      yield put({
        type: 'SearcherCalendarReducer',
        payload: response,
      });
    },
    * SearcherJurCalendar(payload, { call, put }) {
      const response = yield call(getSearcherJurCalendar, payload);
      yield put({
        type: 'SearcherJurCalendarReducer',
        payload: response,
      });
    },
    * SearcherData(payload, { call, put }) {
      const response = yield call(getSearcherData, payload);
      yield put({
        type: 'SearcherDataReducer',
        payload: response,
      });
    },
    * SearcherRPNData(payload, { call, put }) {
      const response = yield call(getSearcherRPNData, payload);
      yield put({
        type: 'SearcherRNPDataReducer',
        payload: response,
      });
    },
    * SearcherMEDData(payload, { call, put }) {
      const response = yield call(getSearcherMEDData, payload);
      yield put({
        type: 'SearcherMEDDataReducer',
        payload: response,
      });
    },
    * SearcherJur(payload, { call, put }) {
      const response = yield call(getSearcherJur, payload);
      yield put({
        type: 'SearcherJurReducer',
        payload: response,
      });
    },
    * getperiodYear(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicperiodyearReducer',
        payload: response,
      });
    },
    * getperiodSection(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicperiodSectionReducer',
        payload: response,
      });
    },
    * getorganization(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicorganizationReducer',
        payload: response,
      });
    },
    * getmedicalType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicmedicalTypeReducer',
        payload: response,
      });
    },
    * getattachmentType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicattachmentTypeReducer',
        payload: response,
      });
    },
    * getpaymentRequestType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicpaymentRequestTypeReducer',
        payload: response,
      });
    },
    * getdivisions(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicdivisionsReducer',
        payload: response,
      });
    },
    * getactivity(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicactivityReducer',
        payload: response,
      });
    },
    * getmeasureUnit(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicmeasureUnitReducer',
        payload: response,
      });
    },
    * getidentifierType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicidentifierTypeReducer',
        payload: response,
      });
    },
    * getcurrencyType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'diccurrencyTypeReducer',
        payload: response,
      });
    },
    * getlegalForm(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'diclegalFormReducer',
        payload: response,
      });
    },
    * saveobject(payload, { call, put }) {
      const response = yield call(saveObject, payload);
      yield put({
        type: 'saveObjectReducer',
        payload: response,
      });
    },
    * getobject(payload, { call, put }) {
      const response = yield call(getObject, payload);

      yield put({
        type: 'getObjectReducer',
        payload: response,
      });
    },
    * getSubContract(payload, { call, put }) {
      const response = yield call(createSubContract, payload);

      yield put({
        type: 'createContractFromAgentReducer',
        payload: response,
      });
    },
    * getCounterAgentData(payload, { call, put }) {
      const response = yield call(createContractFromAgent, payload);

      yield put({
        type: 'createContractFromAgentReducer',
        payload: response,
      });

    },
    * clearData(payload, { call, put }) {

      yield put({
        type: 'clearDataReducer',
        payload: {
          typeName: payload.payload.typeName,
          value: payload.payload.value ? payload.payload.value : [],
        },
      });
    },
    * createActForContract(payload, { call, put }) {
      const response = yield call(createActForContract, payload);
      yield put({
        type: 'createActForContractReducer',
        payload: response,
      });
    },
    * deleteObject(payload, { call, put }) {
      const response = yield call(deleteObject, payload);
      yield put({
        type: 'deleteObjectReducer',
        payload: response,
      });
    },
    * rejectDocument(payload, { call, put }) {
      const response = yield call(rejectDocument, payload);
      yield put({
        type: 'rejectDocumentReducer',
        payload: response,
      });
    },
    * publishing(payload, { call, put }) {
      const response = yield call(publishing, payload);

      yield put({
        type: 'publishReducer',
        payload: response || {},
      });
    },

    * reloadMt100Packet(payload, { call, put }) {
      const response = yield call(reloadMt100Packet, payload);

      yield put({
        type: 'reloadMt100PacketReducer',
        payload: response || {},
      });
    },
  },

  reducers: {
    getCommandResultReducer(state, { payload }) {

      return {
        ...state,
        commandResult: payload,
      };
    },
    publishReducer(state, { payload }) {
      return {
        ...state,
        publishanswer: payload,
      };
    },
    reloadMt100PacketReducer(state, { payload }) {
      return {
        ...state,
        reloadMt100Packet: payload,
      };
    },
    deleteObjectReducer(state, { payload }) {
      return {
        ...state,
        deletedObject: payload,
      };
    },
    rejectDocumentReducer(state, { payload }) {
      return {
        ...state,
        rejectDocument: payload,
      };
    },
    createActForContractReducer(state, { payload }) {
      return {
        ...state,
        getObjectData: payload,
      };
    },
    clearDataReducer(state, { payload }) {
      return {
        ...state,
        [payload.typeName]: payload.value,
      };
    },
    createContractFromAgentReducer(state, { payload }) {
      return {
        ...state,
        getObjectData: payload,
      };
    },
    getObjectReducer(state, { payload }) {
      return {
        ...state,
        getObjectData: payload,
      };
    },

    files(state, { payload }) {
      return {
        ...state,
        files: payload,
      };
    },
    mt102(state, { payload }) {
      return {
        ...state,
        mt102file: payload,
      };
    },
    mt102dataReducer(state, { payload }) {
      return {
        ...state,
        modalgridviewdata: payload,
      };
    },
    mt102prevReducer(state, { payload }) {
      return {
        ...state,
        refundKnpList: payload.refundKnpList,
      };
    },
    setfileReduce(state, { payload }) {
      return {
        ...state,
        setfile: payload,
      };
    },
    paymentsDataReducer(state, { payload }) {
      return {
        ...state,
        paymentsData: {
          ...state.paymentsData,
          [payload.type]: payload.response,
        },
      };
    },
    maintable(state, { payload }) {
      if (payload === undefined) {
        return {
          ...state,
          table: {
            'size': 15,
            'totalElements': 0,
            'totalPages': 0,
            'content': [],
          },
        };
      }
      return {
        ...state,
        table: payload,
      };
    },
    maincolumn(state, { payload }) {
      return {
        ...state,
        columns: payload,
      };
    },
    rpmuReduce(state, { payload }) {
      return {
        ...state,
        rpmu: payload,
      };
    },
    mainModalReducer(state, { payload }) {
      return {
        ...state,
        mainmodal: payload,
      };
    },
    mainSelect1Reduce(state, { payload }) {
      return {
        ...state,
        select1: payload,
      };
    },
    setAcceptToRefundReducer(state, { payload }) {
      return {
        ...state,
        setAcceptToRefund: payload,
      };
    },
    setRefundNeedAcceptUserReducer(state, { payload }) {
      return {
        ...state,
        setRefundNeedAcceptUser: payload,
      };
    },
    getUsersReducer(state, { payload }) {
      return {
        ...state,
        users: payload,
      };
    },
    createRefunkPackReducer(state, { payload }) {
      return {
        ...state,
        createRefunkPack: payload,
      };
    },
    OptionReducer(state, { payload }) {
      return {
        ...state,
        options: payload,
      };
    },
    OptionChangeReducer(state, { payload }) {
      return state;
    },
    SearcherCalendarReducer(state, { payload }) {
      return {
        ...state,
        searchercalendar: payload,
      };
    },
    SearcherJurCalendarReducer(state, { payload }) {
      return {
        ...state,
        searcherjurcalendar: payload,
      };
    },
    SearcherDataReducer(state, { payload }) {
      return {
        ...state,
        searcherdata: payload,
      };
    },
    SearcherRNPDataReducer(state, { payload }) {
      return {
        ...state,
        searcherRPNdata: payload,
      };
    },
    SearcherMEDDataReducer(state, { payload }) {
      return {
        ...state,
        searcherMEDdata: payload,
      };
    },
    SearcherJurReducer(state, { payload }) {
      return {
        ...state,
        searcherjur: payload,
      };
    },
    dicperiodyearReducer(state, { payload }) {
      return {
        ...state,
        periodYear: payload,
      };
    },
    dicperiodSectionReducer(state, { payload }) {
      return {
        ...state,
        periodSection: payload,
      };
    },
    dicorganizationReducer(state, { payload }) {
      return {
        ...state,
        organization: payload,
      };
    },
    dicmedicalTypeReducer(state, { payload }) {
      return {
        ...state,
        medicalType: payload,
      };
    },
    dicattachmentTypeReducer(state, { payload }) {
      return {
        ...state,
        attachmentType: payload,
      };
    },
    dicpaymentRequestTypeReducer(state, { payload }) {
      return {
        ...state,
        paymentRequestType: payload,
      };
    },
    dicdivisionsReducer(state, { payload }) {
      return {
        ...state,
        divisions: payload,
      };
    },
    dicactivityReducer(state, { payload }) {
      return {
        ...state,
        activity: payload,
      };
    },
    dicmeasureUnitReducer(state, { payload }) {
      return {
        ...state,
        measureUnit: payload,
      };
    },


    dicidentifierTypeReducer(state, { payload }) {
      return {
        ...state,
        identifierType: payload,
      };
    },
    diccurrencyTypeReducer(state, { payload }) {
      return {
        ...state,
        currencyType: payload,
      };
    },
    diclegalFormReducer(state, { payload }) {
      return {
        ...state,
        legalForm: payload,
      };
    },
    /*identifierType: {},
   currencyType: {},
   legalForm: {},*/

    saveObjectReducer(state, { payload }) {
      return {
        ...state,
        saveanswer: payload,
      };
    },
    uploadFileReducer(state, { payload }) {
      return {
        ...state,
        uploadanswer: payload,
      };
    },
  },
};
