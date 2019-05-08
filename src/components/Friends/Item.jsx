import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonAdd from '@material-ui/icons/PersonAdd';
import PersonAddDisabled from '@material-ui/icons/PersonAddDisabled';
import Message from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { database } from '../../firebase';
import { useStateValue } from '../../context';

const Item = ({ user, history }) => {
  const [friend, setFriend] = useState(user);
  const [state, dispatch] = useStateValue();
  const addFriend = () => {
    setFriend({ ...friend, isFriend: true });
    database()
      .ref('/users')
      .child(state.user.username)
      .child('/friendList')
      .set(state.user.friendList ? [...state.user.friendList, friend.username] : [friend.username]);
    database()
      .ref('/users')
      .child(friend.username)
      .child('/friendList')
      .set(friend.friendList ? [...friend.friendList, state.user.username] : [state.user.username]);
  };
  const deleteFriend = () => {
    setFriend({ ...friend, isFriend: false });
    database()
      .ref('/users')
      .child(state.user.username)
      .child('/friendList')
      .set(state.user.friendList.filter(f => f !== friend.username));
  };
  const startChat = () => {
    const chatName = `${friend.username}-${state.user.username}`;
    const chatsRef = u =>
      database()
        .ref('users')
        .child(u)
        .child('chats');
    database()
      .ref('/users')
      .child(state.user.username)
      .child('chats')
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          const chats = Object.values(snapshot.val());
          if (!chats.find(ch => ch === chatName)) {
            chatsRef(state.user.username).push(chatName);
            chatsRef(friend.username).push(chatName);
          } else {
            history.push('/messages');
          }
        } else {
          chatsRef(state.user.username).push(chatName);
          chatsRef(friend.username).push(chatName);
          history.push('/messages');
        }
      });
  };
  return (
    <ListItem button alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={`${friend.username}'s picture`} src={friend.imageURL} />
      </ListItemAvatar>
      <ListItemText
        primary={friend.username}
        secondary={
          <Fragment>
            {friend.name && (
              <Typography component="span" color="textPrimary">
                {friend.name}
              </Typography>
            )}
          </Fragment>
        }
      />

      {friend.isFriend ? (
        <Fragment>
          <IconButton onClick={startChat}>
            <Message />
          </IconButton>
          <IconButton onClick={deleteFriend}>
            <PersonAddDisabled />
          </IconButton>
        </Fragment>
      ) : (
        <IconButton onClick={addFriend}>
          <PersonAdd />
        </IconButton>
      )}
    </ListItem>
  );
};

export default withRouter(Item);
