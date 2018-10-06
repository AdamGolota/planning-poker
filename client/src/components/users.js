import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import socket from './../api'

class Users extends Component {
  state =  {
    votes: new Map()
  }
  componentDidMount(){
    socket.on('new user', username => {
      this.setState(state => state.votes.set(username, undefined))
    });

    socket.on('vote', vote => {
      this.setState(state => {state.votes.get(vote.username).mark = vote.mark})
    })
  }

  voteStatus = (vote) => {
    if (this.props.showVotes) {
      return (
        <p>{vote.mark}</p>
      )
    }
    else if (vote.mark === undefined){
      return (
        <p>Voting</p>
      )
    }
    else {
      return (
        <p>Ready</p>
      )
    }
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.votes.forEach((vote) => {
            return(
              <ListGroupItem>
                {vote.username}: {this.voteStatus(vote)}
              </ListGroupItem>
            )
          })}
          
        </ListGroup>
      </div>
    );
  }
}

export default Users;