import appReducer from 'Reducers/appReducer';

export default (state = {}, action) => {
  return {
    appState: appReducer(state.appState, action),
  };
};