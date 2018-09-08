/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    EMAIL_WARNING,
    VERIFY_PASSWORD_ERROR,
    INCORRECT_PASSWORD_WARNING,
    EMAIL_CHANGE_ERROR,
    EMAIL_CHANGE_UNSUCCESSFUL,
    EMAIL_CHANGE_SUCCESSFUL
} from '../../constants';
import { validateEmail } from '../utils';
import '../../css/EditAccount.css';
/* eslint-enable no-unused-vars */

class EditAccountEmailChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: '',
            newEmailReentry: '',
            emailPassword: '',
            newEmailIsValid: undefined,
            newEmailReentryIsValid: undefined,
            emailPasswordIsValid: undefined,
            isEmailChangeSuccessfull: undefined,
            emailChangeMessage: undefined
        };

        this.validateEmailReentry = this.validateEmailReentry.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateCurrentPassword = this.validateCurrentPassword.bind(this);
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
     * If email reentry is not empty string, 
     *      check if email reentry is samse as new email.
     * Else, return false.
     * @param {String} emailReentryInput 
     */
    validateEmailReentry(emailReentryInput, emailInput) {
        let newEmail = emailInput || this.state.newEmail;
        if (emailReentryInput.length > 0) {
            return emailReentryInput === newEmail;
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
        let isNewEmailReentryValid = this.state.newEmailReentryIsValid;

        switch (event.target.name) {
        case 'newEmail':
            isNewEmailValid = this.handleEmailValidation(value);
            isNewEmailReentryValid = this.validateEmailReentry(this.state.newEmailReentry, value);
            break;
        case 'newEmailReentry':
            isNewEmailReentryValid = this.validateEmailReentry(value);
            break;
        default:
            break;
        }

        this.setState({
            [event.target.name]: value,
            newEmailIsValid: isNewEmailValid,
            newEmailReentryIsValid: isNewEmailReentryValid
        });
    }

    /**
     * Return true if user input current password correctly
     */
    validateCurrentPassword(password) {
        return this.props.client.authenticate(
            this.props.userName,
            password
        ).then(response => {
            if (response.ok) {
                return true;
            } else if (response.status === 401) {
                return false;
            } else {
                return undefined;
            }
        }).catch(() => {
            return undefined;
        });
    }

    /**
     * Update user email and return whether process was successful
     */
    updateEmail() {
        return this.props.client.updateUser(
            this.props.userName,
            undefined,
            this.state.newEmail
        ).then(response => {
            if (response.ok) {
                return true;
            } else {
                return false;
            } 
        }).catch(() => {
            return false;
        });
    }

    /**
     * Check new email format and authenticate user with password,
     * then update user email address.
     * @param {Event} event 
     */
    handleEmailChangeSubmit(event) {
        event.preventDefault();

        const isNewEmailValid = this.handleEmailValidation(this.state.newEmail);
        const isNewEmailReentryValid = this.validateEmailReentry(this.state.newEmailReentry);
        let isPasswordValid;
        let isEmailChangeSuccessfull;
        let emailChangeMessage;

        if (isNewEmailValid && isNewEmailReentryValid){
            this.validateCurrentPassword(this.state.emailPassword)
                .then(isVerify => {
                    if (isVerify === true) {
                        isPasswordValid = true;
                        return this.updateEmail();
                    } else if (isVerify === false) {
                        isPasswordValid = false;
                        emailChangeMessage = EMAIL_CHANGE_UNSUCCESSFUL;
                        return false;
                    } else {
                        isPasswordValid = undefined;
                        emailChangeMessage = VERIFY_PASSWORD_ERROR;
                        return false;
                    }
                })
                .then(isUpdated => {
                    if (isUpdated === true) {
                        emailChangeMessage = EMAIL_CHANGE_SUCCESSFUL;
                        isEmailChangeSuccessfull = true;
                    } else {
                        if (!emailChangeMessage) {
                            emailChangeMessage = EMAIL_CHANGE_ERROR;
                        }
                        isEmailChangeSuccessfull = false;
                    }
                })
                .then(() => {
                    this.setState({
                        'newEmailIsValid': isNewEmailValid,
                        'newEmailReentryIsValid': isNewEmailReentryValid,
                        'emailPasswordIsValid': isPasswordValid,
                        'emailPassword': '',
                        'isEmailChangeSuccessfull': isEmailChangeSuccessfull,
                        'emailChangeMessage': emailChangeMessage,
                    });
                });
        } else {
            isPasswordValid = undefined;
            isEmailChangeSuccessfull = false;
            emailChangeMessage = EMAIL_CHANGE_UNSUCCESSFUL;

            this.setState({
                'newEmailIsValid': isNewEmailValid,
                'newEmailReentryIsValid': isNewEmailReentryValid,
                'emailPasswordIsValid': isPasswordValid,
                'emailPassword': '',
                'isEmailChangeSuccessfull': isEmailChangeSuccessfull,
                'emailChangeMessage': emailChangeMessage,
            });
        }
    }

    render() {
        let newEmailWarning, newEmailReentryWarning, emailPasswordWarning;

        let newEmailClass = 'form-group has-';
        let newEmailReentryClass = 'form-group has-';
        let emailPasswordClass = 'form-group has-';
        let emailChangeClass;

        if (this.state.newEmailIsValid !== undefined) {
            if (this.state.newEmailIsValid) {
                newEmailClass += 'success';
            } else {
                newEmailClass += 'error';
                newEmailWarning = <span>{EMAIL_WARNING}</span>;
            }
        }

        if (this.state.newEmailReentryIsValid !== undefined) {
            if (this.state.newEmailReentryIsValid) {
                newEmailReentryClass += 'success';
            } else {
                newEmailReentryClass += 'error';
                newEmailReentryWarning = <span>{'Retyped email does not match new email'}</span>;
            }
        }

        if (this.state.emailPasswordIsValid === true) {
            emailPasswordClass += 'success';
        } else if (this.state.emailPasswordIsValid === false){
            emailPasswordClass += 'error';
            emailPasswordWarning = <span>{INCORRECT_PASSWORD_WARNING}</span>;
        }
        
        emailChangeClass = this.state.isEmailChangeSuccessfull ? 'success-message' :
            this.state.isEmailChangeSuccessfull === false ? 'error-message' : undefined;

        return (
            <div>
                <form onSubmit={this.handleEmailChangeSubmit}
                    autoComplete="new-password">
                    <h3>Email Change</h3>
                    <p className={emailChangeClass}>{this.state.emailChangeMessage}</p>
                    <div className={newEmailClass}>
                        <input type="email"
                            name="newEmail"
                            className="form-control"
                            placeholder="New email"
                            value={this.state.newEmail}
                            onChange={this.handleInputChange}
                            autoComplete="new-password" />
                        {newEmailWarning}
                    </div>

                    <div className={newEmailReentryClass}>
                        <input type="email"
                            name="newEmailReentry"
                            className="form-control"
                            placeholder="Retype new email"
                            value={this.state.newEmailReentry}
                            onChange={this.handleInputChange}
                            autoComplete="new-password" />
                        {newEmailReentryWarning}
                    </div>

                    <div className={emailPasswordClass}>
                        <input type="password"
                            name="emailPassword"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.emailPassword}
                            onChange={this.handleInputChange} />
                        {emailPasswordWarning}
                    </div>
                    <button
                        className="btn">
                        Submit Change
                    </button>
                </form>
            </div>
        );
    }
}

export default EditAccountEmailChange;
