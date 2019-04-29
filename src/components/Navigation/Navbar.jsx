import React, { useState, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FaceIcon from '@material-ui/icons/Face';
import MessagesIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.less';

const Navbar = () => {
  const getValue = () => {
    const { pathname } = window.location;
    if (pathname === '/friends') {
      return 0;
    } else if (pathname === '/messages') {
      return 1;
    }
    return 2;
  };
  const [value, setValue] = useState(getValue);

  return (
    <BottomNavigation className="Navbar" value={value} onChange={(e, v) => setValue(v)}>
      <BottomNavigationAction component={Link} to="/friends" label="Friends" icon={<FaceIcon />} />
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
