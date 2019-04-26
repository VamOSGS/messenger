import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default class Messages extends Component {
  render() {
    return (
      <div>
        Messages
        <List>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://pp.userapi.com/c846416/v846416709/128f68/1MOBT7PQVQc.jpg?ava=1" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://pp.userapi.com/c846416/v846416709/128f68/1MOBT7PQVQc.jpg?ava=1" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://pp.userapi.com/c846416/v846416709/128f68/1MOBT7PQVQc.jpg?ava=1" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    );
  }
}
