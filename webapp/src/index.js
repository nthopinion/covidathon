import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Preview from './Preview';
import Test from './Test';

import 'semantic-ui-css/semantic.min.css';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/preview" component={Preview} />
      <Route path="/test" component={Test} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
