export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'APP_INIT':
      return { ...state, initialized: true };
    default:
      return state;
  }
}