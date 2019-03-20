import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import Routes from './routes/index'
import * as serviceWorker from './utils/serviceWorker'

window.safeGet = function () {
  if (arguments.length < 2)
    return null;

  let object = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    try {
      object = object[arguments[i]];
    } catch (e) {
      return null;
    }
  }
  return object;
};

window.safeGetList = function () {
  if (arguments.length < 2)
    return [];

  let object = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    try {
      object = object[arguments[i]];
    } catch (e) {
      return [];
    }
  }
  return object != null ? object : [];
};


render(
  <Provider store={configureStore()}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
