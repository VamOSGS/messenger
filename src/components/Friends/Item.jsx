import React, { useEffect, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonAdd from '@material-ui/icons/PersonAdd';
import PersonAddDisabled from '@material-ui/icons/PersonAddDisabled';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { database } from '../../firebase';
import { useStateValue } from '../../context';

const Item = ({ user }) => {
  const [friend, setFriend] = useState(user);
  const [state, dispatch] = useStateValue();
  const addFriend = () => {
    setFriend({ ...friend, isFriend: true });
    database()
      .ref('/users')
      .child(state.user.username)
      .child('/friendList')
      .set(state.user.friendList ? [...state.user.friendList, friend.username] : [friend.username]);
  };
  const deleteFriend = () => {
    setFriend({ ...friend, isFriend: false });
    database()
      .ref('/users')
      .child(state.user.username)
      .child('/friendList')
      .set(state.user.friendList.filter(f => f !== friend.username));
  };
  useEffect(() => {
    if (typeof friend === 'string') {
      database()
        .ref('/users')
        .child(friend)
        .once('value', (snapshot) => {
          setFriend({ ...snapshot.val(), isFriend: true });
        });
    }
  }, []);
  return (
    <ListItem button alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={`${friend.username}'s picture`} src={friend.imageURL} />
      </ListItemAvatar>
      <ListItemText
        primary={friend.username}
        secondary={
          <React.Fragment>
            {friend.name && (
              <Typography component="span" color="textPrimary">
                {friend.name}
              </Typography>
            )}
          </React.Fragment>
        }
      />

      {friend.isFriend ? (
        <IconButton onClick={deleteFriend}>
          <PersonAddDisabled />
        </IconButton>
      ) : (
        <IconButton onClick={addFriend}>
          <PersonAdd />
        </IconButton>
      )}
    </ListItem>
  );
};

export default Item;
