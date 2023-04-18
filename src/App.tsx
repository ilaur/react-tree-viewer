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
        <Grid container spacing={4} direction="column">
          <Grid item>
            <AppBar title={'HMI Parameter Service'} />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid
                style={{
                  borderRight: '2px solid',
                  borderBottom: '2px solid',
                  display: 'inline-flex',
                }}
                item
                xs={2}
              >
                <ParametersTree />
              </Grid>

              <Grid item xs={10}>
                <ParametersBranchEditor />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppContextProvider>
    </div>
  );
}
