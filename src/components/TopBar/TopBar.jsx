import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './TopBar.less';

const TopBar = props => (
  <AppBar className="TopBar" position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        {props.title}
      </Typography>
      {props.children}
    </Toolbar>
  </AppBar>
);

export default TopBar;
