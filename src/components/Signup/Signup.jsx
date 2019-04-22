import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../../firebase';
import './Signup.less';

class Signup extends Component {
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
  handleSignUp = async (event) => {
    event.preventDefault();
    if (
      !this.findInFields('Email').error &&
      !this.findInFields('Password').error &&
      !this.findInFields('Username').error
    ) {
      try {
        this.setState({ loading: true });
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.findInFields('Email').value,
            this.findInFields('Password').value,
          );
        const setUsername = await firebase.auth().currentUser.updateProfile({
          displayName: this.findInFields('Username').value,
        });
        this.setState({ loading: false });
        this.props.history.push('/');
      } catch (error) {
        this.setState({ loading: false });
        const { fields } = this.state;
        console.log(error);
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          fields[fields.findIndex(i => i.label === 'Email')].error = true;
          fields[fields.findIndex(i => i.label === 'Email')].errorMessage = error.message;
        } else if (error.code === 'auth/weak-password') {
          fields[fields.findIndex(i => i.label === 'Password')].error = true;
          fields[fields.findIndex(i => i.label === 'Password')].errorMessage = error.message;
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
  render() {
    const { fields, loading } = this.state;
    return (
      <div className="Login">
        {loading && <div>Loading...</div>}
        <form onSubmit={this.handleSignUp}>
          {fields.map((field, index) => (
            <TextField
              key={index}
              id="outlined-uncontrolled"
              onChange={this.handleChange(field.label)}
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
            <Button>Already have an accaunt</Button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
