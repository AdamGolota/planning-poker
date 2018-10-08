import React, { Component } from 'react';
import NewUser from './new-user';
import axios from 'axios';
import {openSocket} from './../api';
class Start extends Component {
  
  handleUserSubmit = (username) => {
    if (this.props.isCreator){
      axios
        .get('/start/' + username)
        .then(res => {
          openSocket(res.data);
          window.location.pathname = '/' + res.data;
        })
        .then(() => this.props.onUserConnected(username))
        .catch(console.log);
    }
    else {
      openSocket(this.props.socketId);
      this.props.onUserConnected(username);
    }
  }

  render() {
    return (
      <div>
        <NewUser
          creator={this.props.isCreator}
          onUserSubmit={this.handleUserSubmit}/>
      </div>
    );
  }
}

export default Start;
