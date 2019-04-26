import React, { Component } from 'react';

import List from './List';

export default class Friends extends Component {
  state = { list: [{ username: 'vamosgs', name: 'Gegham Samvelyan', imageURL: '' }] };
  render() {
    return (
      <div>
        Friends
        <List list={this.state.list} />
      </div>
    );
  }
}
