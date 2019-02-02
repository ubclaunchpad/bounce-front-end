/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, Button, FormGroup, Label } from 'react-bootstrap';
import {
    EMAIL_WARNING, UNEXPECTED_ERROR, USER_UPDATED, INCORRECT_PASSWORD_WARNING
} from '../../constants';
import { validateEmail } from '../utils';
import '../../css/Settings.css';
/* eslint-enable no-unused-vars */

class EmailSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: '',
            currentPassword: '',
            newEmailIsValid: undefined,
            currentPasswordisValid: undefined,
            failed: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmailChangeSubmit = this.handleEmailChangeSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
    }

    /**
     * If new email is not empty string, validate format of email.
     * Else, return undefined
     * @param {string} newEmail
     */
    handleEmailValidation(newEmail) {
        if (newEmail.length > 0) {
            return validateEmail(newEmail);
        } else {
            return undefined;
        }
    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        const value = event.target.value;
        let isNewEmailValid = this.state.newEmailIsValid;
        
        switch(event.target.name){
        case 'newEmail':
            isNewEmailValid = this.handleEmailValidation(value);
            break;
        default:
            break;
        }

        this.setState({
            [event.target.name]: value,
            newEmailIsValid: isNewEmailValid,
        });
    }

    /**
     * Update user email and return whether process was successful
     */
    updateEmail() {
        return this.props.client.updateUser(
            this.props.client.getUsername(),
            undefined,
            this.state.newEmail, 
            this.state.currentPassword
        ).then(response => {
            return response.status;
        }).catch(() => {
            return 400;
        });
    }

    /**
     * Check new email format then update user email address.
     * @param {Event} event
     */
    handleEmailChangeSubmit(event) {
        event.preventDefault();

        let failure;
        const isNewEmailValid = this.handleEmailValidation(this.state.newEmail); 
        let isCurrentPasswordValid = this.state.currentPassword.length > 0;
        if (isNewEmailValid && isCurrentPasswordValid) {
            this.updateEmail()
                .then( status => {
                    switch(status){
                    case 200:
                        failure = false;
                        break;
                    case 401:
                        isCurrentPasswordValid = false;
                        break;
                    case 400:
                        failure = true;
                        break;
                    default:
                        break;
                    }
                })
                .then( () => {
                    this.setState({
                        newEmail: '',
                        currentPassword: '',
                        newEmailIsValid: isNewEmailValid,
                        currentPasswordisValid: isCurrentPasswordValid,
                        failed: failure
                    });
                });
        }  else {
            this.setState({
                newEmail: '',
                currentPassword: '',
                newEmailIsValid: isNewEmailValid,
                currentPasswordisValid: isCurrentPasswordValid,
                failed: failure
            });
        }
    }

    render() {
        let newEmailWarning, newEmailClass, passwordWarning, passwordClass;
        if (this.state.newEmailIsValid !== undefined) {
            if (this.state.newEmailIsValid) {
                newEmailClass = 'has-success';
            } else {
                newEmailClass = 'has-error';
                newEmailWarning = <span>{EMAIL_WARNING}</span>;
            }
        }

        if(this.state.currentPasswordisValid  !== undefined){
            if(this.state.currentPasswordisValid){
                passwordClass = 'has-success';
            }
            else{
                passwordClass = 'has-error';
                passwordWarning = <span>{INCORRECT_PASSWORD_WARNING}</span>;
            }
        }

        return (
            <div>
                <form onSubmit={this.handleEmailChangeSubmit}>
                    {this.state.failed === true &&
                        <Alert bsStyle='danger'>{UNEXPECTED_ERROR}</Alert>
                    }
                    {this.state.failed === false &&
                        <Alert bsStyle='success'>{USER_UPDATED}</Alert>
                    }
                    <FormGroup bsClass={newEmailClass}>
                        <Label>New Email</Label>
                        <input type='email'
                            name='newEmail'
                            className='form-control'
                            placeholder='New email'
                            value={this.state.newEmail}
                            onChange={this.handleInputChange}
                            autoComplete='new-password' />
                        {newEmailWarning}
                    </FormGroup>
                    <FormGroup bsClass={passwordClass}>
                        <Label>Current Password</Label>
                        <input type='password'
                            name='currentPassword'
                            className='form-control'
                            placeholder='Current password'
                            value={this.state.currentPassword}
                            onChange={this.handleInputChange} />
                        {passwordWarning}
                    </FormGroup>
                    <Button bsStyle='primary' type='submit'>Submit</Button>
                </form>
            </div>
        );
    }
}

export default EmailSettings;
