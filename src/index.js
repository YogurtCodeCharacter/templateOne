import React    from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  syncHistoryWithStore,
  routerReducer as routing
} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers    from './reducers/index';
import SagaManager from './sagas/SagaManager';



// store
// -----
const initialState   = {};
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combineReducers({
  ...reducers,
  routing,
}), initialState, enhancer);

SagaManager.startSagas(sagaMiddleware);


// hot replace
// -----------
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers         = require('./reducers');
    const combinedReducers = combineReducers({ ...reducers, routing });
    store.replaceReducer(combinedReducers);
  });
  module.hot.accept('./sagas/SagaManager', () => {
    SagaManager.cancelSagas(store);
    require('./sagas/SagaManager').default.startSagas(sagaMiddleware);
  });
}


// render
// ------
const hashHistory = require("history").createHashHistory();
const history = syncHistoryWithStore(hashHistory, store);
const getRoot = () => document.getElementById('root');

let render = () => {
  const Routers = require('./router').default;
  ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <Routers history={history}/>
        </Provider>
    </LocaleProvider>, getRoot());
};


// hot replace
// -----------
if (module.hot) {
  const renderNormally  = render;
  const renderException = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error}/>, getRoot());
  };

  render = () => {
    try {
      renderNormally();
    } catch (error) {
      console.error('error', error);
      renderException(error);
    }
  };

  module.hot.accept('./router', () => {
    render();
  });
}

render();
