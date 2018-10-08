import React, { Component } from 'react';
import Users from './users';
import History from './history';
class Voting extends Component {
  render() {
    return(
      <div>
        <Users />
        <History />
      </div>
    );
  }
}

export default Voting;