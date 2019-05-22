import React  from 'react';
import Avatar from '@material-ui/core/Avatar';

import {withStyles} from '@material-ui/core/styles'; 

const styles = {
};

function ProfileBadge({profile = {}, classes}){
  return(
      <Avatar alt="profile picture" title={`logged in as ${profile.displayName}`}  src={((profile.photos || [])[0] || []).value} />
  )
}



export default withStyles(styles)(ProfileBadge);
