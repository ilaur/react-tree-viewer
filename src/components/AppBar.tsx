import React from 'react';

import { AppBar as MUIBar, Box, Toolbar, Typography } from '@mui/material';

type AppBarProps = {
  title: string;
};

export default function AppBar({ title }: AppBarProps): React.ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIBar position="static">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </MUIBar>
    </Box>
  );
}
