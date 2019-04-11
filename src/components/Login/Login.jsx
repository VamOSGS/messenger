import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

class LogInContainer extends Component {
  state = { error: null };
  handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push('/');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        this.setState({ error: 'WRONG PASSWORD' });
      } else if (error.code === 'auth/user-not-found') {
        this.setState({ error: 'USER NOT FOUND, WRONG EMAIL' });
      }
    }
  };

  render() {
    return (
      <div>
        <StyledFirebaseAuth
          uiCallback={ui => ui.disableAutoSignIn()}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        {/* <form onSubmit={this.handleSignUp}>
          <p className="error" style={{ color: 'red' }}>
            {this.state.error}
          </p>
          <div>
            Email
            <input style={{ width: '100%' }} name="email" type="email" placeholder="Email" />
          </div>
          <div>
            Password
            <input
              style={{ width: '100%' }}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">Log in</button>
        </form> */}
      </div>
    );
  }
}

export default withRouter(LogInContainer);
