const initialState = {
  loading: true
};

const reducer = (state = initialState, action) => {

  console.log(action.type)
  switch (action.type) {
    case "REQUESTED":
      return {
        data: {},
        loading: true,
        error: false
      };
    case "REQUESTED_SUCCEEDED":
      return {
        data: action.data,
        loading: false,
        error: false
      };
    case "REQUESTED_FAILED":
      return {
        data: "",
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default {
  "reducer": reducer
};