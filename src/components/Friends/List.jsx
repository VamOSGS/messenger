import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ListComponent = ({ list }) => (
  <List>
    {list.map((friend, index) => (
      <ListItem key={index} button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`${friend.username}'s picture`} src={friend.imageURL} />
        </ListItemAvatar>
        <ListItemText
          primary={friend.username}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {friend.name}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    ))}
  </List>
);

export default ListComponent;
