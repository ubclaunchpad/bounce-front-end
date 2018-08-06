/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    INVALID_INFO,
    USERNAME_OR_EMAIL_TAKEN,
    CREATE_ACCOUNT_FAILURE
} from '../constants';
/* eslint-enable no-unused-vars */

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            usernameIsValid: undefined,
            emailIsValid: undefined,
            passwordIsValid: undefined,
            errorMsg: undefined,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * Handles the event that occurs when a user hits submit on the 'Create
     * Account' form by attempting to create the new account.
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.usernameIsValid
            || !this.state.emailIsValid
            || !this.state.passwordIsValid) {
            // At least one of the inputs is not valid, so do nothing
            return;
        }
        this.props.client.createUser(
            this.state.fullName,
            this.state.username,
            this.state.password,
            this.state.email
        ).then(response => {
            if (response.ok) {
                // Trigger authentication on the parent component so the user
                // is signed in and can use the app
                this.props.onCreateAccount(this.state.username, this.state.password);
            } else if (response.status === 400) {
                // The users's info is invalid
                this.setState({ errorMsg: INVALID_INFO });
            } else if (response.status === 409) {
                // The username or email is already taken
                this.setState({ errorMsg: USERNAME_OR_EMAIL_TAKEN });
            } else {
                // Some unexpected error occurred
                this.setState({ errorMsg: CREATE_ACCOUNT_FAILURE });
            }
        }).catch(() => {
            // An error occurred in the browser while handling the request
            this.setState({ errorMsg: CREATE_ACCOUNT_FAILURE });
        });
    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        // Make sure the value matches the requirements for its field
        const value = event.target.value;
        switch (event.target.name) {
        case 'username':
            this.setState({
                'usernameIsValid': this.validateUsername(value)
            });
            break;
        case 'email':
            this.setState({
                'emailIsValid': this.validateEmail(value)
            });
            break;
        case 'password':
            this.setState({
                'passwordIsValid': this.validatePassword(value)
            });
            break;
        }

        this.setState({
            [event.target.name]: value,
        });
    }

    /**
     * Returns true if the username is valid and false otherwise
     * @param {String} username
     */
    validateUsername(username) {
        if (username.length < 3 || username.length > 20) {
            return false;
        }
        const regexes = [
            /[A-Z]+/,
            /[a-z]+/,
            /[0-9]+/,
            /[.\-_]+/
        ];
        for (let i in regexes) {
            let match = username.match(regexes[i]);
            while (match !== null) {
                username = username.replace(match[0], '');
                match = username.match(regexes[i]);
            }
        }
        return username.length === 0;
    }

    /**
     * Returns true if the password is valid and false otherwise
     * @param {String} password
     */
    validatePassword(password) {
        if (password.length < 8) {
            return false;
        }
        const regexes = [
            /[A-Z]+/,
            /[a-z]+/,
            /[0-9]+/,
            /[.\-!@#$%^&*?_+ ]+/
        ];
        for (let i in regexes) {
            let match = password.match(regexes[i]);
            let count = 0;
            while (match !== null) {
                password = password.replace(match[0], '');
                match = password.match(regexes[i]);
                count++;
            }
            if (count === 0) {
                return false;
            }
        }
        return password.length === 0;
    }

    /**
     * Returns true if the email is valid and false otherwise
     * @param {String} email
     */
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    render() {
        let errorMsg;
        let buttonClass = 'btn btn-primary';
        let usernameClass = 'form-group has-';
        let emailClass = 'form-group has-';
        let passwordClass = 'form-group has-';

        // Display error message if there is one
        if (this.state.errorMsg) {
            errorMsg = <p className='bg-warning text-warning'> {this.state.errorMsg} </p>;
        }
        // Disable submit button if input is invalid
        if (!this.state.usernameIsValid | !this.state.passwordIsValid || !this.state.emailIsValid) {
            buttonClass += ' disabled';
        }
        // Signal the validity of each input if it's been filled in
        if (this.state.usernameIsValid !== undefined) {
            usernameClass += this.state.usernameIsValid ? 'success' : 'error';
        }
        if (this.state.emailIsValid !== undefined) {
            emailClass += this.state.emailIsValid ? 'success' : 'error';
        }
        if (this.state.passwordIsValid !== undefined) {
            passwordClass += this.state.passwordIsValid ? 'success' : 'error';
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Create an Account</h1>

                {errorMsg}

                <div className='form-group'>
                    <label>Name</label>
                    <input type='text'
                        name='fullName'
                        placeholer='Name'
                        className='form-control'
                        value={this.state.fullName}
                        onChange={this.handleInputChange} />
                </div>

                <div className={usernameClass}>
                    <label>Username</label>
                    <input type='text'
                        name='username'
                        placeholer='Username'
                        className='form-control'
                        value={this.state.username}
                        onChange={this.handleInputChange} />
                </div>

                <div className={emailClass}>
                    <label>Email</label>
                    <input type='text'
                        name='email'
                        placeholer='Email'
                        className='form-control'
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                </div>

                <div className={passwordClass}>
                    <label>Password</label>
                    <input type='password'
                        name='password'
                        placeholer='Password'
                        className='form-control'
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </div>

                <button className={buttonClass}>Create Account</button>
            </form>
        );
    }
}

export default CreateAccount;
