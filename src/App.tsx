import React from 'react';
import { Grid } from '@mui/material';

import AppBar from './components/AppBar';
import ParametersTree from './components/ParametersTree';
import ParametersBranchEditor from './components/ParametersBranchEditor';

import { AppContextProvider } from './AppContext';

import './App.css';

export default function App(): React.ReactElement {
  return (
    <div className="App">
      <AppContextProvider>
        <AppBar title={'HMI Parameter Service'} />
        <Grid container direction="row" spacing={24} alignContent="center">
          <Grid item>
            <ParametersTree />
          </Grid>
          <Grid item>
            <ParametersBranchEditor />
          </Grid>
        </Grid>
      </AppContextProvider>
    </div>
  );
}
