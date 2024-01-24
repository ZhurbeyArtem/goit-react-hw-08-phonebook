import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { persister, store } from './redux/store';
import { App } from 'components/App';
import './index.module.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
