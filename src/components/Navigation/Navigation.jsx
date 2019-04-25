import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import Messages from '../Messages';
import Friends from '../Friends';
import PrivateRoute from '../Signup/PrivateRoute';

const Navigation = props => (
  <Fragment>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route
      exact
      path="/"
      render={() => (props.authenticated ? <Redirect to="/me" /> : <Redirect to="/login" />)}
    />

    <PrivateRoute
      exact
      user={props.currentUser}
      update={props.updateUser}
      authenticated={props.authenticated}
      path="/me"
      component={Profile}
    />
    <PrivateRoute exact path="/messages" component={Messages} authenticated={props.authenticated} />
    <PrivateRoute exact path="/friends" component={Friends} authenticated={props.authenticated} />
    {props.authenticated && <Navbar user={props.currentUser} />}
  </Fragment>
);

export default Navigation;
