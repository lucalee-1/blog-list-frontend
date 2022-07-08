import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, ScopedCssBaseline } from '@mui/material';
import App from './App';
import store from './store';
import { theme } from './styles/theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <App />
      </ScopedCssBaseline>
    </ThemeProvider>
  </Provider>
);
