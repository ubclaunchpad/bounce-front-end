/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    PASSWORD_WARNING,
    EMAIL_WARNING,
    VERIFY_PASSWORD_ERROR,
    INCORRECT_PASSWORD_WARNING,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_UNSUCCESSFUL,
    PASSWORD_CHANGE_SUCCESSFUL,
    EMAIL_CHANGE_ERROR,
    EMAIL_CHANGE_UNSUCCESSFUL,
    EMAIL_CHANGE_SUCCESSFUL
} from '../../constants';
import {
    validatePassword,
    validateEmail
} from '../utils';
import '../../css/EditAccount.css';
/* eslint-enable no-unused-vars */

class EditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            newPasswordReentry: '',
            newEmail: '',
            newEmailReentry: '',
            emailPassword: '',
            currentPasswordIsValid: undefined,
            newPasswordIsValid: undefined,
            newPasswordReentryIsValid: undefined,
            newEmailIsValid: undefined,
            newEmailReentryIsValid: undefined,
            emailPasswordIsValid: undefined,
            isPasswordChangeSuccessful: undefined,
            isEmailChangeSuccessfull: undefined,
            passwordChangeMessage: undefined,
            emailChangeMessage: undefined
        };

        this.validatePasswordReentry = this.validatePasswordReentry.bind(this);
        this.validateEmailReentry = this.validateEmailReentry.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateCurrentPassword = this.validateCurrentPassword.bind(this);
        this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.handleEmailChangeSubmit = this.handleEmailChangeSubmit.bind(this);
    }

    /**
     * If new password is not empty string, validate format of password.
     * Else, return undefined
     * @param {string} newPassword
     */
    handlePasswordValidation(newPassword) {
        if (newPassword.length > 0) {
            return validatePassword(newPassword);
        } else {
            return undefined;
        }
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
     * If password reentry is not empty string,
     *      check if password reentry is same as new password.
     * Else, return false
     */
    validatePasswordReentry(passwordReentryInput, passwordInput) {
        let newPassword = passwordInput || this.state.newPassword;
        if (passwordReentryInput.length > 0) {
            return passwordReentryInput === newPassword;
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

        let isNewPasswordValid = this.state.newPasswordIsValid;
        let isNewPasswordReentryValid = this.state.newPasswordReentryIsValid;
        let isNewEmailValid = this.state.newEmailIsValid;
        let isNewEmailReentryValid = this.state.newEmailReentryIsValid;

        switch (event.target.name) {
            case 'newPassword':
                isNewPasswordValid = this.handlePasswordValidation(value);
                isNewPasswordReentryValid = this.validatePasswordReentry(this.state.newPasswordReentry, value);
                break;
            case 'newPasswordReentry':
                isNewPasswordReentryValid = this.validatePasswordReentry(value);
                break;
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
            newPasswordIsValid: isNewPasswordValid,
            newPasswordReentryIsValid: isNewPasswordReentryValid,
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
     * Update user password and return whether process was successful
     */
    updatePassword() {
        // Stub
        return true;
    }

    /**
     * Revalidate password inputs. 
     * If there is undefined or false states, set password inputs to empty.
     * @param {Event} event 
     */
    handlePasswordChangeSubmit(event) {
        event.preventDefault();

        let isPasswordValid;
        const isNewPasswordValid = this.handlePasswordValidation(this.state.newPassword);
        let isNewPasswordReentryValid = this.validatePasswordReentry(this.state.newPasswordReentry);
        let isPasswordChangeSuccessful;
        let passwordChangeMessage;

        if (isNewPasswordValid && isNewPasswordReentryValid) {
            this.validateCurrentPassword(this.state.currentPassword)
                .then(isVerify => {
                    if (isVerify === true) {
                        isPasswordValid = true;
                        return this.updatePassword();
                    } else if (isVerify === false) {
                        isPasswordValid = false;
                        passwordChangeMessage = PASSWORD_CHANGE_UNSUCCESSFUL;
                        return false;
                    } else {
                        isPasswordValid = undefined;
                        passwordChangeMessage = VERIFY_PASSWORD_ERROR;
                        return false;
                    }
                })
                .then(isUpdated => {
                    if (isUpdated === true) {
                        passwordChangeMessage = PASSWORD_CHANGE_SUCCESSFUL;
                        isPasswordChangeSuccessful = true;
                    } else {
                        if (!passwordChangeMessage) {
                            passwordChangeMessage = PASSWORD_CHANGE_ERROR;
                        }
                        isPasswordChangeSuccessful = false;
                    }
                })
                .then(() => {
                    this.setState({
                        'currentPasswordIsValid': isPasswordValid,
                        'newPasswordIsValid': isNewPasswordValid,
                        'newPasswordReentryIsValid': isNewPasswordReentryValid,
                        'currentPassword': '',
                        'newPassword': '',
                        'newPasswordReentry': '',
                        'isPasswordChangeSuccessful': isPasswordChangeSuccessful,
                        'passwordChangeMessage': passwordChangeMessage
                    });
                });
        } else {
            isPasswordValid = undefined;
            isPasswordChangeSuccessful = false;
            passwordChangeMessage = PASSWORD_CHANGE_UNSUCCESSFUL;
            if (isNewPasswordValid === false) {
                isNewPasswordReentryValid = undefined;
            }

            this.setState({
                'currentPasswordIsValid': isPasswordValid,
                'newPasswordIsValid': isNewPasswordValid,
                'newPasswordReentryIsValid': isNewPasswordReentryValid,
                'currentPassword': '',
                'newPassword': '',
                'newPasswordReentry': '',
                'isPasswordChangeSuccessful': isPasswordChangeSuccessful,
                'passwordChangeMessage': passwordChangeMessage
            });
        }
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
        })
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
                    })
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
        let currentPasswordWarning, newPasswordWarning, newPasswordReentryWarning, newEmailWarning, newEmailReentryWarning, emailPasswordWarning;

        let currentPasswordClass = 'form-group has-';
        let newPasswordClass = 'form-group has-';
        let newPasswordReentryClass = 'form-group has-';
        let newEmailClass = 'form-group has-';
        let newEmailReentryClass = 'form-group has-';
        let emailPasswordClass = 'form-group has-';
        let emailChangeClass;
        let passwordChangeClass;

        if (this.state.currentPasswordIsValid === true) {
            currentPasswordClass += 'success';
        } else if (this.state.currentPasswordIsValid === false){
            currentPasswordClass += 'error';
            currentPasswordWarning = <span>{INCORRECT_PASSWORD_WARNING}</span>;
        }

        if (this.state.newPasswordIsValid !== undefined) {
            if (this.state.newPasswordIsValid) {
                newPasswordClass += 'success';
            } else {
                newPasswordClass += 'error';
                newPasswordWarning = <span>{PASSWORD_WARNING}</span>;
            }
        } else {
            newPasswordWarning = <span>{PASSWORD_WARNING}</span>;
        }

        if (this.state.newPasswordReentryIsValid !== undefined) {
            if (this.state.newPasswordReentryIsValid) {
                newPasswordReentryClass += 'success';
            } else {
                newPasswordReentryClass += 'error';
                newPasswordReentryWarning = <span>{'Retyped password does not match new password'}</span>;
            }
        }

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

        passwordChangeClass = this.state.isPasswordChangeSuccessful ? 'success-message' : 
            this.state.isPasswordChangeSuccessful === false ? 'error-message' : undefined;
        
        emailChangeClass = this.state.isEmailChangeSuccessfull ? 'success-message' :
            this.state.isEmailChangeSuccessfull === false ? 'error-message' : undefined;

        return (
            <div className="edit-account-settings">
                <h2>Account Settings</h2>
                <form onSubmit={this.handlePasswordChangeSubmit}>
                    <h3>Password Change</h3>
                    <p className={passwordChangeClass}>{this.state.passwordChangeMessage}</p>
                    <div className={currentPasswordClass}>
                        <input type="password"
                            name="currentPassword"
                            className="form-control"
                            placeholder="Current password"
                            value={this.state.currentPassword}
                            onChange={this.handleInputChange} />
                        {currentPasswordWarning}
                    </div>

                    <div className={newPasswordClass}>
                        <input type="password"
                            name="newPassword"
                            className="form-control"
                            placeholder="New password"
                            value={this.state.newPassword}
                            onChange={this.handleInputChange}
                            onBlur={this.handleOnBlur} />
                        {newPasswordWarning}
                    </div>

                    <div className={newPasswordReentryClass}>
                        <input type="password"
                            name="newPasswordReentry"
                            className="form-control"
                            placeholder="Retype new password"
                            value={this.state.newPasswordReentry}
                            onChange={this.handleInputChange}
                            onBlur={this.handleOnBlur} />
                        {newPasswordReentryWarning}
                    </div>

                    <button 
                        className='btn' >
                        Submit Change
                    </button>
                </form>

                <form onSubmit={this.handleEmailChangeSubmit}>
                    <h3>Email Change</h3>
                    <p className={emailChangeClass}>{this.state.emailChangeMessage}</p>
                    <div className={newEmailClass}>
                        <input type="email"
                            name="newEmail"
                            className="form-control"
                            placeholder="New email"
                            value={this.state.newEmail}
                            onChange={this.handleInputChange}
                            onBlur={this.handleOnBlur} />
                        {newEmailWarning}
                    </div>

                    <div className={newEmailReentryClass}>
                        <input type="email"
                            name="newEmailReentry"
                            className="form-control"
                            placeholder="Retype new email"
                            value={this.state.newEmailReentry}
                            onChange={this.handleInputChange}onBlur={this.handleOnBlur} />
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

export default EditAccountSettings;
