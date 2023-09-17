import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ComplicationProvider } from './context/ComplicationContext';

ReactDOM.render(
  <ComplicationProvider>
    <App />
  </ComplicationProvider>,
  document.getElementById('root')
);
