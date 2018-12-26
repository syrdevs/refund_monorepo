import { connect } from "react-redux";
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

    function mapDispatchToProps(dispatch) {
      return {
        dispatch(action) {
          return dispatch(action);
        }
      };
    }

    function mapStateToProps(state) {

      let params = {
        loading: {
          effects: effects
        },
        ...modelsData
      };

      return { ...args(params), ...state };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Component);
  };
};