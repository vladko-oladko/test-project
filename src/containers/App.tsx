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
import styles from './App.module.css';

const store = createStore();

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <nav className={styles.header}>
        <Link to="/">Home</Link>
        <Link to="/currency">Currency</Link>
        <Link to="/analysis">Analysis</Link>
      </nav>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
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
      </div>
    </Router>
  </Provider>
);

export default App;
