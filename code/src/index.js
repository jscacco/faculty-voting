import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore } from 'redux';
import rootReducer from './store/reducers/index';
import { Provider } from 'react-redux';

import App from './App';
import Routes from './Routes';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="App">
        <App />
        <Routes />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
