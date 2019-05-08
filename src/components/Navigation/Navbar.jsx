import React, { useState, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FaceIcon from '@material-ui/icons/Face';
import MessagesIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.less';

const Navbar = () => {
  const { pathname } = window.location;
  const getValue = () => {
    if (pathname === '/contacts') {
      return 0;
    } else if (pathname === '/messages') {
      return 1;
    }
    return 2;
  };
  const [value, setValue] = useState(getValue);
  useEffect(() => {
    if (pathname === '/contacts') {
      setValue(0);
    } else if (pathname === '/messages') {
      setValue(1);
    } else {
      setValue(2);
    }
  });
  if (pathname === '/signup') return null;
  return (
    <BottomNavigation className="Navbar" value={value} onChange={(e, v) => setValue(v)}>
      <BottomNavigationAction
        component={Link}
        to="/contacts"
        label="Contacts"
        icon={<FaceIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/messages"
        label="Messages"
        icon={<MessagesIcon />}
      />
      <BottomNavigationAction component={Link} to="/me" label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
};

export default withRouter(Navbar);
