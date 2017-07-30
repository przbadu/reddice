// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// Components
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);
registerServiceWorker();
