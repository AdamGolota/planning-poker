import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Form } from 'reactstrap';

const maxLen = 20;
const messages = {
    wrongInput: "Sorry, only a-z, A-Z and _ characters are allowed",
    tooLong: `Sorry, username must be no longer than ${maxLen} characters.`
};


class NewUser extends Component {
    state = {
        username: "",
        message: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onUserSubmit(this.state.username);
    }

    handleChange = (e) => {
        let username = e.target.value;
        if (!isLiteral(username) && username) {
            this.msg = messages.wrongInput;
            return;
        }
        if (username.length > maxLen) {
            this.msg = messages.tooLong;
            return;
        }
        this.username = username;
    }
    set msg(str) {
        this.setState({ message: str });
    }
    set username(username) {
        this.setState({ username: username });
    }
    get isSubmitDisabled() {
        return !this.state.username;
    }
    get buttonText() {
        return this.props.creator ? "Create session!" : "Enter session";
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <p>Username</p>
                    <Input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Input
                        type="submit"
                        value = {this.buttonText}
                        disabled={this.isSubmitDisabled}
                    />
                </FormGroup>
            </Form>
        );
    }
}

function isLiteral(str) {
    return !str.match(/[^a-z_]/i);
}

export default NewUser;