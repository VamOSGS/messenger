/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import List from './List';
import { useStateValue } from '../../context';
import './Friends.less';
import { database } from '../../firebase';

const Friends = () => {
  const [list, updateList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [{ user }] = useStateValue();
  const handleChange = (e) => {
    setSearching(true);
    if (!e.target.value) {
      setSearching(false);
    }
    if (e.target.value.length > 1) {
      database()
        .ref('/users')
        .orderByKey()
        .startAt(e.target.value)
        .endAt(`${e.target.value}\uf8ff`)
        .once('value', (snapshot) => {
          if (snapshot.val()) {
            const sObject = snapshot.val();
            delete sObject[user.username];
            const sList = Object.values(sObject).map((u) => {
              if (user.friendList) {
                if (user.friendList.find(i => i === u.username)) {
                  u.isFriend = true;
                } else {
                  u.isFriend = false;
                }
              }
              return u;
            });
            updateList(sList);
          } else {
            updateList([]);
          }
        });
    } else if (e.target.value === user.username) {
      setSearching(false);
      updateList(user.friendList);
    } else {
      updateList(user.friendList);
    }
  };
  return (
    <div className="Friends">
      <TextField onChange={handleChange} label="Search for new friends..." />
      {searching && (
        <React.Fragment>
          <h3>Seaching</h3>
          <List list={list} />
        </React.Fragment>
      )}
      <React.Fragment>
        <h3>Friends</h3>
        <List list={user.friendList} message="You don't have friends" />
      </React.Fragment>
    </div>
  );
};

export default Friends;
