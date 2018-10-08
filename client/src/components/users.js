import React, {Component} from 'react';
import uuid from 'uuid/v1';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {sEmitGetUsers,sOnUsers,
  sOnVotes, sOnNewUser, sOnVote, sOnUserDisconnected} from './../api';

class Users extends Component {
  state =  {
    users: [],
    votes: new Map()
  }
  componentDidMount(){
    sEmitGetUsers();

    sOnUsers((users) => {
      this.setState({users: users})
    });

    sOnVotes(votes => {
      this.setState({votes: votes})
    });

    sOnNewUser(username => {
      this.setState(state => state.users.push(username));
    });
    
    sOnVote(vote => {
      this.setState(state => state.votes.set(vote.username, vote.mark));
    });
    sOnUserDisconnected(username => {
      this.setState(state =>{
        let id = state.users.indexOf(username);
        state.users.splice(id, 1);
      });
      this.forceUpdate();
    });
  }

  voteStatus = (mark) => {
    let status = 'Ready';
    if (this.props.showVotes) {
      status = <p>{mark}</p>
    }
    else if (mark === undefined){
      status = 'Voting';
    }
    return (<span>{status}</span>);
  }

  render() {
    return (
      <div>
        <p>Users</p>
        <ListGroup>
          {this.state.users.map((username) => {
            let mark = this.state.votes.get(username);
            return(
              <ListGroupItem key={'user'+uuid()}>
                {username}: {this.voteStatus(mark)}
              </ListGroupItem>
            )
          })}
          
        </ListGroup>
      </div>
    );
  }
}

export default Users;