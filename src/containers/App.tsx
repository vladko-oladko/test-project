import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../store/index';

const store = createStore();

const App: React.FC = () => (
  <Provider store={store}>
    <h1>Hello, world!</h1>
  </Provider>
);

export default App;
