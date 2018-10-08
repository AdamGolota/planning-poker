import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid/v1';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {sEmitGetHistory,
  sOnHistory, sOnStory} from './../api';


class History extends Component {
  state = {
    stories: []
  }
  componentDidMount() {
    sEmitGetHistory();
    sOnHistory(stories => this.setState({stories: stories}));
    sOnStory(story => this.setState(state => state.stories.unshift(story)));
  }
  render() {
    return (
      <div> 
        <p>History:</p>
        <ListGroup>
          {this.state.stories.map((story, index) => {
            return(
              <ListGroupItem key={'story'+uuid()}>
                {index}: {story.text}
              </ListGroupItem>
            )
          })}
          
        </ListGroup>
      </div>
    );
  }
}

export default History;
