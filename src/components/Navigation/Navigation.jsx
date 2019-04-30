import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './Navbar';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import Messages from '../Messages';
import Friends from '../Friends';
import PrivateRoute from '../Signup/PrivateRoute';
import { auth, database } from '../../firebase';
import { useStateValue } from '../../context';

const Navigation = () => {
  const [{ authenticated }, dispatch] = useStateValue();
  const [loading, setLoading] = useState('true');
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        database()
          .ref(`/users/${user.displayName}`)
          .on('value', (snapshot) => {
            dispatch({
              type: 'setUser',
              payload: snapshot.val(),
            });
            setLoading(false);
          });
      } else {
        setLoading(false);
        dispatch({
          type: 'removeUser',
        });
      }
    });
  }, []);
  if (loading) return <CircularProgress className="AppLoader" />;
  return (
    <Fragment>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" render={() => <Redirect to="/me" />} />
      <PrivateRoute path="/me" component={Profile} />
      <PrivateRoute path="/messages" component={Messages} />
      <PrivateRoute path="/friends" component={Friends} />
      {authenticated && <Navbar />}
    </Fragment>
  );
};

export default Navigation;
