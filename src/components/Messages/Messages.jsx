import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TopBar from '../TopBar';
import { useStateValue } from '../../context';
import { database } from '../../firebase';

const Messages = () => {
  const [state, dispatch] = useStateValue();
  const [chats, updateChats] = useState(state.chats ||
      Object.values(state.user.chats).map(chatName => chatName.split('-').filter(u => u !== state.user.username)[0]));
  useEffect(() => {
    if (typeof chats[0] === 'string') {
      Promise.all(chats.map(name =>
        database()
          .ref('/users')
          .child(name)
          .once('value')
          .then(snapshot => snapshot.val()))).then((messages) => {
        dispatch({ type: 'setChats', payload: messages });
        updateChats(messages);
      });
    }
  }, []);
  return (
    <div>
      <TopBar title="Messages" />
      {chats ? (
        <List>
          {chats.map((chat, i) => (
            <ListItem key={i} button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`${chat.username}'s image`} src={chat.imageURL} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.username}
                secondary={<React.Fragment> — Last message…</React.Fragment>}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        "You don't have messages"
      )}
    </div>
  );
};

export default Messages;
