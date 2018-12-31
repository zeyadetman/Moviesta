import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home/Home';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
