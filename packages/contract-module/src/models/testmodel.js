export default {
  namespace: "testmodel",
  state: {
    testModelData: {}
  },
  effects: {

    * testMethod(payload, { call, put }) {

      const data = yield call(() => {
          return fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json());
        }
      );

      yield put({
        type: "testMethodReducer",
        payload: data
      });
    }


  },

  reducers: {
    testMethodReducer(state, { payload }) {
      return {
        ...state,
        testModelData: payload
      };
    }


  }
};
