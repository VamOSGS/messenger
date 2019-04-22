import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from '../../firebase';
import './Login.less';

class LogInContainer extends Component {
  state = {
    loading: false,
    email: { value: '', error: false },
    password: { value: '', error: false },
  };
  handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email.error && !password.error) {
      this.setState({ loading: true });
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
        this.props.history.push('/');
      } catch (error) {
        this.setState({ loading: false });
        if (error.code === 'auth/wrong-password') {
          this.setState({
            password: { ...this.state.password, error: true, errorMessage: 'WRONG PASSWORD' },
          });
        } else if (error.code === 'auth/user-not-found') {
          this.setState({
            email: { ...this.state.email, error: true, errorMessage: 'User not found' },
          });
        }
      }
    }
  };
  handleChange = prop => (e) => {
    this.setState({
      [prop]: {
        value: e.target.value,
        error: false,
      },
    });
  };
  render() {
    const { password, email, loading } = this.state;
    return (
      <div className="Login">
        {loading && <div>Loading...</div>}
        <form onSubmit={this.handleSignUp}>
          {(password.error || email.error) && (
            <Typography style={{ color: 'red' }} component="p">
              {email.errorMessage}
              {password.errorMessage}
            </Typography>
          )}
          <TextField
            id="outlined-uncontrolled"
            onChange={this.handleChange('email')}
            value={email.value}
            label="Email"
            margin="normal"
            error={email.error}
            variant="outlined"
          />
          <TextField
            id="outlined-uncontrolled"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            error={password.error}
            value={password.value}
            onChange={this.handleChange('password')}
          />
          <Button onClick={this.handleSignUp} variant="contained">
            Sign in
          </Button>

          <Link to="/signup">
            <Button>Sign up</Button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(LogInContainer);
