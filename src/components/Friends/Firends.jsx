/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import GroupAdd from '@material-ui/icons/GroupAdd';
import List from './List';
import TopBar from '../TopBar';
import { useStateValue } from '../../context';
import { database } from '../../firebase';
import './Friends.less';

const Friends = (props) => {
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
      updateList([]);
    } else {
      updateList([]);
    }
  };
  return (
    <div className="Friends">
      <TopBar title={searching ? '' : 'Contacts'}>
        <div className={`search ${searching && 'active'}`}>
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase className="inputRoot" placeholder="Search…" onChange={handleChange} />
        </div>
        <IconButton onClick={() => setSearching(!searching)} aria-haspopup="true" color="inherit">
          <GroupAdd />
        </IconButton>
      </TopBar>
      {searching ? (
        <List list={list} />
      ) : (
        <List list={user.friendList} message="You don't have friends" />
      )}
    </div>
  );
};

export default Friends;
