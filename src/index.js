import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';
import './css/fontawesome-all.min.css'
import './css/dv-styles.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers'
import { Provider } from 'react-redux'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

ReactDOM.render((
  <Provider store={store}>
      <App />
  </Provider>
  ), document.getElementById('root'));

registerServiceWorker();
