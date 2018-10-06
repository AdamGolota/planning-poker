import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Form } from 'reactstrap';


class StoryInput extends Component {
  state = {
    posted: false
  }

  handleSubmit = (e) => {
    e.preventDefault;
    story = e.target.elements.word.value
    this.props.handleStorySubmit(story)
  }
  get isSubmitDisabled() {
    return !posted;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <p>Enter a new user story to post:</p>
            <Input
              name="story"
              type="text"
            />
            <Input
              type="submit"
              value="Post!"
              disabled={this.isSubmitDisabled}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default StoryInput;