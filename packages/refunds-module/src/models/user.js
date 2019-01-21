export default {
  namespace: "user",
  state: {
    status: undefined,
    userInfo: {}
  },
  effects: {
    * setInfo(payload, { call, put }) {
      yield put({
        type: "setInfoRedux",
        payload: payload
      });
    },
    * getInfo(payload, { call, put }) {
      yield put({
        type: "getInfoRedux"
      });
    }
  },

  reducers: {
    setInfoRedux(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    },
    getInfoRedux(state) {
      return state;
    }
  }
};
