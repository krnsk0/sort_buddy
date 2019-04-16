import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    {/* <Router> */}
      <App />
    {/* </Router> */}
  </Provider>,
  document.getElementById('app')
);
