import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
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
      <SwipeableRoutes replace className="screen">
        <PrivateRoute className="screen" path="/contacts" component={Friends} />
        <PrivateRoute className="screen" path="/messages" component={Messages} />
        <PrivateRoute className="screen" path="/me" component={Profile} />
      </SwipeableRoutes>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" render={() => <Redirect to="/me" />} />
      {authenticated && <Navbar />}
    </Fragment>
  );
};

export default Navigation;
