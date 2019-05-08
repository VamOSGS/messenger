import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import BackIcon from '@material-ui/icons/ArrowBack';
import { LinearProgress } from '@material-ui/core';
import List from './List';
import TopBar from '../TopBar';
import { useStateValue } from '../../context';
import { database } from '../../firebase';
import './Friends.less';

const Friends = (props) => {
  const [list, updateList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [{ user }, dispatch] = useStateValue();
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
  const [friendList, setFriendList] = useState(user.friendList);
  const checkFriendList = typeof friendList[0] === 'string';
  useEffect(() => {
    if (checkFriendList) {
      Promise.all(friendList.map(username =>
        database()
          .ref('/users')
          .child(username)
          .once('value')
          .then(snapshot => snapshot.val()))).then((users) => {
        dispatch({ type: 'setFriends', payload: users });
        setFriendList(users);
      });
    }
  }, []);
  return (
    <div className={`Friends ${searching && 'searching'}`}>
      <TopBar title={searching ? '' : 'Contacts'}>
        <div className={`search ${searching && 'active'}`}>
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase className="inputRoot" placeholder="Search…" onChange={handleChange} />
        </div>
        <IconButton onClick={() => setSearching(!searching)} aria-haspopup="true" color="inherit">
          {searching ? <BackIcon /> : <SearchIcon />}
        </IconButton>
      </TopBar>
      {searching && (
        <div className="searchList">
          <List list={list} />
        </div>
      )}
      {!checkFriendList ? (
        <List list={friendList} message="You don't have friends" />
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default Friends;
