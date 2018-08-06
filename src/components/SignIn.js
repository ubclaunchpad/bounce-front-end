/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { UNAUTHORIZED, SIGNIN_ERROR } from '../constants';
import CreateAccount from './CreateAccount';
import { Redirect } from 'react-router-dom';
/* eslint-enable no-unused-vars */

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            username: '',
            password: '',
            errorMsg: undefined,
            accountCreated: this.props.accountCreated,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.onCreateAccount = this.onCreateAccount.bind(this);
        this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    }

    /**
     * Handle the event that occurs when a user clicks the "Sign In" button
     * by authenticating them with the backend.
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        this.handleSignIn(false);
    }

    /**
     * Authenticates the user with the back-end.
    * @param {Boolean} isNewAccount whether or not this account was just created
     */
    handleSignIn(isNewAccount) {
        this.props.client.authenticate(
            this.state.username,
            this.state.password
        ).then(response => {
            // Check if authentication was successful
            if (response.ok) {
                // Trigger a page transition in the parent component
                this.props.onSignIn(isNewAccount, this.state.username);
                this.setState({ 'isSignedIn': true });
            } else if (response.status === 401) {
                // The users's credentials are invalid
                this.setState({ errorMsg: UNAUTHORIZED });
            } else {
                // Some unexpected error occurred
                this.setState({ errorMsg: SIGNIN_ERROR });
            }
        }).catch(() => {
            // An error occurred in the browser while handling the request
            this.setState({ errorMsg: SIGNIN_ERROR });
        });
    }

    /**
     * Authenticates the user with the given credentials. Called to
     * automatically sign a user in when they create their account.
     * @param {String} username
     * @param {String} password
     */
    onCreateAccount(username, password) {
        this.setState({ username: username, password: password });
        this.handleSignIn(true);
    }

    /**
     * Update this component's state when the user enters his/her credentials.
     * @param {Event} event
     */
    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Triggers a page re-render so the user is shown the create account page.
     * @param {Event} event
     */
    handleCreateAccountClick(event) {
        event.preventDefault();
        this.setState({ accountCreated: false });
    }

    render() {
        if (this.state.isSignedIn) {
            return <Redirect to='/' />;
        }
        if (!this.state.accountCreated) {
            return <CreateAccount
                client={this.props.client}
                onCreateAccount={this.onCreateAccount}
            />;
        }
        const error = this.state.errorMsg ? <p>{this.state.errorMsg}</p> : undefined;

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign In</h1>

                {error}

                <div className='form-group'>
                    <label>Username</label>
                    <input type='text'
                        name='username'
                        placeholder='Username'
                        className='form-control'
                        value={this.state.username}
                        onChange={this.handleInput} />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input type='password'
                        name='password'
                        placeholder='Password'
                        className='form-control'
                        value={this.state.password}
                        onChange={this.handleInput} />
                </div>

                <button className='btn btn-primary'>Sign In</button>
                <button
                    onClick={this.handleCreateAccountClick}
                    className='btn btn-secondary'>
                    Create Account
                </button>
            </form>
        );
    }
}

export default SignIn;
