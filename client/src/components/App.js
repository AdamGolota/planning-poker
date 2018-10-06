import React, { Component } from 'react';
import Start from './start';
import Users from './users'
import socket from './../api'
class App extends Component {
  render() {
    return (
      <div>
        <Start />
        <Users />
      </div>
    );
  }
}

export default App;
