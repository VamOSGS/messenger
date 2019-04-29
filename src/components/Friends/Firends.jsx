import React from 'react';

import List from './List';

const Friends = () => {
  const list = [{ username: 'vamosgs', name: 'Gegham Samvelyan', imageURL: '' }];
  return (
    <div>
      Friends
      <List list={list} />
    </div>
  );
};
export default Friends;
