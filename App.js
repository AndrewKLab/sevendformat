import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { Router } from './Router';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
