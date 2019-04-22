import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase';

const Profile = ({ user }) => {
  const SignOut = () => firebase.auth().signOut();
  return (
    <div>
      <div>Profile</div>
      <div>Email: {user.email}</div>
      <div>Username: {user.displayName}</div>
      <Button variant="contained" onClick={SignOut}>Log out</Button>
    </div>
  );
};
export default Profile;
