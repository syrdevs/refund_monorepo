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
import { connect } from "react-redux";
import models from "./model.config";
export default (function (args) {
    var modelsData = {};
    var effects = {};
    models.forEach(function (model) {
        modelsData[model.namespace] = model.state;
        Object.keys(model.effects).forEach(function (effectItemKey) {
            effects[model.namespace + "/" + model.effects[effectItemKey].name] = false;
        });
    });
    return function (Component) {
        function mapDispatchToProps(dispatch) {
            return {
                dispatch: function (action) {
                    return dispatch(action);
                }
            };
        }
        function mapStateToProps(state) {
            var params = __assign({ loading: {
                    effects: effects
                } }, modelsData);
            return __assign({}, args(params), state);
        }
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
});
//# sourceMappingURL=index.js.map