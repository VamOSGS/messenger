import React, { Component } from 'react';
import firebase from '../../firebase';

class Profile extends Component {
  // eslint-disable-next-line class-methods-use-this
  SignOut() {
    firebase.auth().signOut();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.SignOut}>Log out</button>
        <div>Profile</div>
        <div>Email: {this.props.user.email}</div>
        <div>Name: {this.props.user.displayName}</div>
      </div>
    );
  }
}

export default Profile;
