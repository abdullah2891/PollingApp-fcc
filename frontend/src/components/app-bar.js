import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ProfileBadge from './shared/profile-badge.js';

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

const twitterCallback = "http://127.0.0.1:3001/login/twitter/callback";


function openLink(link){
  window.open(link, "_top");
}

function CustomAppBar(props){
  const { classes } = props;
  console.log(props.profile) 
  return(
   <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Polling App
          </Typography>
          {!props.profile  &&
            <Button color="inherit" onClick={openLink.bind(this, twitterCallback)}>Login</Button>
          }
          <Button color="inherit" onClick={openLink.bind(this, '/')}>Home</Button>
          {props.profile &&
            <Button color="inherit" onClick={openLink.bind(this, '/create')}>Create Poll</Button>
          }
          {props.profile  &&
            <ProfileBadge
              profile = {props.profile}
            />
          }
        </Toolbar>
      </AppBar>
    </div>
 
  )
}


export default withStyles(styles)(CustomAppBar);
