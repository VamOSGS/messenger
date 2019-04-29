import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../../context';

export default function PrivateRoute({ component: Component, ...rest }) {
  const [{ authenticated }] = useStateValue();
  return (
    <Route
      {...rest}
      render={props =>
        (authenticated ? <Component {...props} {...rest} /> : <Redirect to="/login" />)
      }
    />
  );
}
