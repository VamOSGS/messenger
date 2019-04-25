import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase, { database } from '../../firebase';

class Profile extends Component {
  state = {
    text: '',
  };
  componentDidMount() {
    database()
      .ref(`/users/${this.props.user.displayName}`)
      .on('value', (snapshot) => {
        this.props.update(snapshot.val());
      });
  }
  SignOut = () => {
    firebase.auth().signOut();
  };
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };
  handleClick = () => {
    database()
      .ref('/users/vamosgs')
      .once('value', (data) => {
        console.log(data.val());
      });
  };
  render() {
    const { user } = this.props;
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.text} type="text" />
        <button onClick={this.handleClick}>add</button>
        <h3>Profile</h3>
        <div>Email: {user.email}</div>
        <div>Name: {user.name}</div>
        <div>Username: {user.username}</div>
        <Button variant="contained" onClick={this.SignOut}>
          Log out
        </Button>
      </div>
    );
  }
}
export default Profile;
