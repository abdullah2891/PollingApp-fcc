import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function openTwitterCallback(){

  window.open("http://127.0.0.1:3001/login/twitter/callback", "_top");
}


function CustomAppBar(props){
  const { classes } = props;
  
  return(
   <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Polling App
          </Typography>
          <Button color="inherit" onClick={openTwitterCallback}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
 
  )
}


export default withStyles(styles)(CustomAppBar);
