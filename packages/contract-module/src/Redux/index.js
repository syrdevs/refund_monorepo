import { connect } from "react-redux";
import store from "./store";
import models from "./model.config";


export default (args) => {


  let modelsData = {};
  let effects = {};
  models.forEach((model) => {
    modelsData[model.namespace] = model.state;
    Object.keys(model.effects).forEach((effectItemKey) => {
      effects[model.namespace + "/" + model.effects[effectItemKey].name] = false;
    });


  });


  return (Component) => {

    let params = {
      loading: {
        effects: effects
      },
      ...modelsData
    };

    function mapDispatchToProps(dispatch) {
      return {
        dispatch(action) {
          return store._dispatch(action);
        }
      };
    }

    function mapStateToProps(state) {
      return { ...args(params), ...state };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Component);
  };
};