import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import './components/App.css';

import reducers from './reducers';
import BeerItem from "./components/BeerComponents/BeerDetail";
import BeerList from "./components/BeerComponents/BeerList";


// Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

ReactDOM.render(
  <Provider store={ store }>
    <div className="ui container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ BeerList } />
          <Route path="/beer/:id" component={ BeerItem } />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);