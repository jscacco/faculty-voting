import React                              from 'react';
import ReactDOM                           from 'react-dom';
import { BrowserRouter as Router }        from 'react-router-dom';

import { createStore, applyMiddleware }   from 'redux';
import { Provider }                       from 'react-redux';
import createSagaMiddleware               from 'redux-saga';

import rootReducer                        from './store/reducers/index';
import { watcherSaga }                    from './store/sagas/index';

import App                             from './App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="App">
        <App />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
