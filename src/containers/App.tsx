import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Analysis from './Analysis';
import Currency from './Currency';
import Home from './Home';
import { createStore } from '../store/index';

const store = createStore();

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/analysis">Analysis</Link>
            </li>
            <li>
              <Link to="/currency">Currency</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/analysis">
            <Analysis />
          </Route>
          <Route path="/currency">
            <Currency />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
