var initialState = {
    loading: true
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
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
export default reducer;
//# sourceMappingURL=reducer.js.map