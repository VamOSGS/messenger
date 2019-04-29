import React, { Component, Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { database, auth, storage } from '../../firebase';
import Image from './Image';
import './Profile.less';
import { useStateValue } from '../../context';

const Profile = () => {
  const [{ user }] = useStateValue();
  const SignOut = () => {
    auth().signOut();
  };
  return (
    <div className="Profile">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Your Profile
        </Typography>

        <Fragment>
          <Image />
          <Typography variant="h5" component="h2">
            {user.username}
          </Typography>
          <Typography color="textSecondary">{user.name}</Typography>
          <Typography color="textSecondary">{user.email}</Typography>
        </Fragment>
      </CardContent>

      <CardActions>
        <Button type="file" onClick={SignOut} size="small">
          Log out
        </Button>
      </CardActions>
    </div>
  );
};
export default Profile;
