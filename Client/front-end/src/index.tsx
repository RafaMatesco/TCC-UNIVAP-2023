import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext, {UserProvider } from './components/UserConfig/User';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <UserProvider>

      <App />
  </UserProvider>
);
