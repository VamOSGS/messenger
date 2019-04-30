import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth, database } from '../../firebase';
import './Login.less';
import { useStateValue } from '../../context';

function Login(props) {
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [loading, setLoading] = useState(false);
  const [{ user, authenticated }, dispatch] = useStateValue();
  useEffect(() => {
    if (authenticated) props.history.push('/me');
  }, []);
  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!email.error && !password.error) {
      setLoading(true);
      try {
        const getUser = await auth().signInWithEmailAndPassword(email.value, password.value);
        await database()
          .ref('/users/')
          .child(getUser.user.displayName)
          .once('value', snapshot => dispatch({ type: 'setUser', payload: snapshot.val() }));
        props.history.push('/me');
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          setPassword({ error: true, errorMessage: 'Wrong Password', value: password.value });
        } else if (error.code === 'auth/user-not-found') {
          setEmail({ error: true, errorMessage: 'User not found', value: email.value });
        }
      }
    }
  };
  return (
    <div className="Login">
      {loading && <CircularProgress />}
      <form>
        {(password.error || email.error) && (
          <Typography style={{ color: 'red' }} component="p">
            {email.errorMessage}
            {password.errorMessage}
          </Typography>
        )}
        <TextField
          onChange={e => setEmail({ value: e.target.value, error: false })}
          value={email.value}
          label="Email"
          margin="normal"
          error={email.error}
          variant="outlined"
        />
        <TextField
          onChange={e => setPassword({ value: e.target.value, error: false })}
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          error={password.error}
          value={password.value}
        />
        <Button onClick={handleSignIn} variant="contained">
          Sign in
        </Button>

        <Link to="/signup">
          <Button>Sign up</Button>
        </Link>
      </form>
    </div>
  );
}
export default withRouter(Login);
