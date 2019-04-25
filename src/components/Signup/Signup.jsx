/* eslint-disable prefer-promise-reject-errors */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { database, auth } from '../../firebase';
import './Signup.less';

class Signup extends Component {
  static getDerivedStateFromProps(props) {
    if (auth().currentUser) props.history.push('/');
    return null;
  }
  state = {
    loading: false,
    fields: [
      {
        label: 'Username',
        value: '',
        error: false,
        errorMessage: '',
      },
      {
        label: 'Name',
        value: '',
        error: false,
        errorMessage: '',
      },
      {
        label: 'Email',
        value: '',
        error: false,
        errorMessage: '',
      },
      {
        label: 'Password',
        value: '',
        error: false,
        errorMessage: '',
      },
    ],
  };
  findInFields(arg) {
    return this.state.fields.find(l => l.label === arg);
  }
  checkUsername = username =>
    new Promise((resolve, reject) => {
      if (username) {
        database()
          .ref(`/users/${username}`)
          .once('value', (snapshot) => {
            if (snapshot.val() === null) {
              resolve('REGISTREEED');
            } else {
              reject({ code: 'auth/username', message: 'Username already used' });
            }
          });
      } else {
        reject({ code: 'auth/username', message: 'Username is reqiured' });
      }
    });
  handleSignUp = async (event) => {
    event.preventDefault();
    const username = this.findInFields('Username').value;
    const password = this.findInFields('Password').value;
    const email = this.findInFields('Email').value;
    const name = this.findInFields('Name').value;
    if (
      !this.findInFields('Email').error &&
      !this.findInFields('Password').error &&
      !this.findInFields('Username').error
    ) {
      this.setState({ loading: true });
      try {
        const checkUsername = await this.checkUsername(username);
        const registerUser = await auth().createUserWithEmailAndPassword(email, password);
        const setData = await database()
          .ref(`/users/${username}`)
          .set({
            username,
            email,
            name,
            uid: registerUser.user.uid,
          });
        const setUsername = await auth().currentUser.updateProfile({
          displayName: username,
        });
        this.props.history.push('/');
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
        const { fields } = this.state;
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          fields[fields.findIndex(i => i.label === 'Email')].error = true;
          fields[fields.findIndex(i => i.label === 'Email')].errorMessage = error.message;
        } else if (error.code === 'auth/weak-password') {
          fields[fields.findIndex(i => i.label === 'Password')].error = true;
          fields[fields.findIndex(i => i.label === 'Password')].errorMessage = error.message;
        } else if (error.code === 'auth/username') {
          fields[fields.findIndex(i => i.label === 'Username')].error = true;
          fields[fields.findIndex(i => i.label === 'Username')].errorMessage = error.message;
        }
        this.setState({ fields });
      }
    }
  };
  handleChange = prop => (e) => {
    const { fields } = this.state;
    fields[fields.findIndex(i => i.label === prop)].value = e.target.value;
    fields[fields.findIndex(i => i.label === prop)].error = false;
    this.setState({ fields });
  };
  handleFocus = (e) => {
    if (e.key === 'Enter') this.handleSignUp(e);
  };
  render() {
    const { fields, loading } = this.state;
    const errors = fields.filter(f => f.error);
    return (
      <div className="Login">
        {loading && <CircularProgress />}
        <form>
          {errors &&
            errors.map((error, index) => (
              <Typography style={{ color: 'red' }} key={index}>
                {error.errorMessage}
              </Typography>
            ))}
          {fields.map((field, index) => (
            <TextField
              key={index}
              onChange={this.handleChange(field.label)}
              onKeyPress={this.handleFocus}
              value={field.value}
              label={field.label}
              margin="normal"
              error={field.error}
              variant="outlined"
              type={field.label}
            />
          ))}

          <Button onClick={this.handleSignUp} variant="contained">
            Sign up
          </Button>

          <Link to="/login">
            <Button>Already have an account</Button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
