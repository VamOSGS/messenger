import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FaceIcon from '@material-ui/icons/Face';
import MessagesIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.less';

class Navbar extends Component {
  static getDerivedStateFromProps() {
    if (window.location.pathname === '/friends') {
      return { value: 0 };
    } else if (window.location.pathname === '/messages') {
      return { value: 1 };
    }
    return { value: 2 };
  }
  state = {
    value: 2,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <BottomNavigation className="Navbar" value={value} onChange={this.handleChange}>
        <BottomNavigationAction
          component={Link}
          to="/friends"
          label="Friends"
          icon={<FaceIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/messages"
          label="Messages"
          icon={<MessagesIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={{
            pathname: '/me',
            state: { user: 'this.props.user' },
          }}
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    );
  }
}

export default withRouter(Navbar);
