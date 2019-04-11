import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../firebase';

class SignUpContainer extends Component {
  handleSignUp = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    const { email, password } = event.target.elements;
    const user = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSignUp}>
          <div>
            Email
            <input name="email" type="email" placeholder="Email" />
          </div>
          <div>
            Password
            <input name="password" type="password" placeholder="Password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpContainer);
