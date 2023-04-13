import React from 'react';

import ParametersTree from './components/ParametersTree';

import { AppContextProvider } from './AppContext';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <ParametersTree />
      </AppContextProvider>
    </div>
  );
}
