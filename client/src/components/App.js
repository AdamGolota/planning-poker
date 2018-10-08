import React, { Component } from 'react';
import Start from './start';
import Voting from './voting'
import {sEmitNewUser, sOnStage} from './../api';

let socketId;

class App extends Component {
  state = {
    stories: [],
    stage: 0,
    isCreator: true
  }
  componentDidMount () {
    let path = window.location.pathname;
    let findId = path.match(/^\/(\d+)$/);
    if (findId){
      this.setState({isCreator: false});
      socketId = findId[1];
    }   
  }
  handleUserConnected = (username) => {
    sEmitNewUser(username);
    sOnStage(stage => {
      this.setState({stage: stage});
    });
  }

  get currentStageComponent() {
    switch (this.state.stage){
      case 0:
        return (
          <Start 
            isCreator={this.state.isCreator}
            onUserConnected={this.handleUserConnected}
            socketId={socketId}/>
        );
      case 1:
        return <Voting />;
      default:
        console.error(`Unexpected stage ${this.state.stage}!`)
    }
  }

  render() {
    return (
      <div>
        {this.currentStageComponent}
      </div>
    );
  }
}

export default App;
