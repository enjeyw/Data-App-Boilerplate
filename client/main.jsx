import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import rootReducer from './reducers/rootReducer'
import rootsaga  from './sagas/rootSaga'

import HomePage from './components/homePage.jsx'


const sagaMiddleware = createSagaMiddleware();

// Setup redux dev tools
const composeSetup = process.env.NODE_ENV !== 'prod' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
  rootReducer,
  composeSetup(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootsaga);


ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

