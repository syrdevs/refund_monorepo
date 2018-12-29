export default (effectName) => {
  return (state, action) => {

    const REQUESTED = effectName + "/REQUESTED";
    const REQUESTED_SUCCEEDED = effectName + "/REQUESTED_SUCCEEDED";
    const REQUESTED_FAILED = effectName + "/REQUESTED_FAILED";

    switch (action.type) {
      case REQUESTED:
        return true;
      case REQUESTED_SUCCEEDED:
        return false;
      case REQUESTED_FAILED:
        return false;
      default:
        return false;
    }
  };
};