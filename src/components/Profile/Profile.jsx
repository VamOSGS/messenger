import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Image from './Image';
import TopBar from '../TopBar';
import { auth } from '../../firebase';
import { useStateValue } from '../../context';
import './Profile.less';

const Profile = () => {
  const [{ user }] = useStateValue();
  const SignOut = () => {
    auth().signOut();
  };
  return (
    <div className="Profile">
      <TopBar title="Profile">
        <Button type="file" onClick={SignOut} size="small" color="inherit">
          Log out
        </Button>
      </TopBar>
      <CardContent>
        <Fragment>
          <Image />
          <Typography variant="h5" component="h2">
            {user.username}
          </Typography>
          <Typography color="textSecondary">{user.name}</Typography>
          <Typography color="textSecondary">{user.email}</Typography>
        </Fragment>
      </CardContent>
    </div>
  );
};
export default Profile;
