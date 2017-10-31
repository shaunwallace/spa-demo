import { h, preact } from 'preact';
import thunk from 'redux-thunk';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import AppStore from 'Stores/appStore';
import AppContainer from 'Containers/appContainer';

let store = createStore(AppStore, applyMiddleware(thunk));

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  store = createStore(
    AppStore,
    composeEnhancers(applyMiddleware(thunk)),
  );
}

export default () =>
  <Provider store={store}>
    <AppContainer />
  </Provider>;
