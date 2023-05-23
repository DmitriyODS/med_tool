import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BaseTheme from './theme/baseTheme';
import { Provider } from 'react-redux';
import RootStore from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={BaseTheme}>
      <CssBaseline />
      <Provider store={RootStore}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
