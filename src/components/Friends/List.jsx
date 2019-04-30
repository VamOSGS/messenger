import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Item from './Item';

const ListComponent = ({ list, message }) => {
  if (list) {
    if (list.length > 0) {
      return (
        <List>
          {list.map((friend, index) => (
            <React.Fragment key={index}>
              <Item user={friend} /> <Divider />
            </React.Fragment>
          ))}
        </List>
      );
    }
  }
  return <h3>{message}</h3>;
};

export default ListComponent;
