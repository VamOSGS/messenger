/* eslint-disable prefer-promise-reject-errors */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { database, auth } from '../../firebase';
import { useStateValue } from '../../context';
import './Signup.less';

const Signup = (props) => {
  const [{ authenticated }, dispatch] = useStateValue();
  useEffect(() => {
    if (authenticated) props.history.push('/me');
  }, []);
  const [username, setUsername] = useState({
    label: 'Username',
    value: '',
    error: false,
    errorMessage: '',
  });
  const [name, setName] = useState({
    label: 'Name',
    value: '',
    error: false,
    errorMessage: '',
  });
  const [email, setEmail] = useState({
    label: 'Email',
    value: '',
    error: false,
    errorMessage: '',
  });
  const [password, setPassword] = useState({
    label: 'Password',
    value: '',
    error: false,
    errorMessage: '',
  });
  const [loading, setLoading] = useState(false);

  const checkUsername = checkingUsername =>
    new Promise((resolve, reject) => {
      if (checkingUsername) {
        database()
          .ref(`/users/${checkingUsername}`)
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

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!email.error && !password.error && !username.error) {
      setLoading(true);
      try {
        const checkUsernameTask = await checkUsername(username.value);
        const registerUser = await auth().createUserWithEmailAndPassword(
          email.value,
          password.value,
        );
        const setData = await database()
          .ref(`/users/${username.value}`)
          .set({
            username: username.value,
            email: email.value,
            name: name.value,
            uid: registerUser.user.uid,
            imageURL: '',
          });
        const setUsernameTask = await auth().currentUser.updateProfile({
          displayName: username.value,
        });
        await database()
          .ref(`/users/${username.value}`)
          .once('value', (snapshot) => {
            setLoading(false);
            dispatch({ type: 'setUser', payload: snapshot.val() });
            props.history.push('/me');
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          setEmail({ ...email, error: true, errorMessage: error.message });
        } else if (error.code === 'auth/weak-password') {
          setPassword({ ...password, error: true, errorMessage: error.message });
        } else if (error.code === 'auth/username') {
          setUsername({ ...username, error: true, errorMessage: error.message });
        }
      }
    }
  };
  const handleFocus = (e) => {
    if (e.key === 'Enter') handleSignUp(e);
  };
  const fields = [
    { ...username, update: e => setUsername({ ...username, value: e.target.value, error: false }) },
    { ...name, update: e => setName({ ...name, value: e.target.value, error: false }) },
    { ...email, update: e => setEmail({ ...email, value: e.target.value, error: false }) },
    { ...password, update: e => setPassword({ ...password, value: e.target.value, error: false }) },
  ];
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
            onChange={field.update}
            onKeyPress={handleFocus}
            value={field.value}
            label={field.label}
            margin="normal"
            error={field.error}
            variant="outlined"
            type={field.label}
          />
        ))}

        <Button onClick={handleSignUp} variant="contained">
          Sign up
        </Button>

        <Link to="/login">
          <Button>Already have an account</Button>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(Signup);
