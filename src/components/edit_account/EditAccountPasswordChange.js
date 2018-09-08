/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { validatePassword }from '../utils';
import {
    PASSWORD_WARNING,
    VERIFY_PASSWORD_ERROR,
    INCORRECT_PASSWORD_WARNING,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_UNSUCCESSFUL,
    PASSWORD_CHANGE_SUCCESSFUL
} from '../../constants';
import '../../css/EditAccount.css';
/* eslint-enable no-unused-vars */

class EditAccountPasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            newPasswordReentry: '',
            currentPasswordIsValid: undefined,
            newPasswordIsValid: undefined,
            newPasswordReentryIsValid: undefined,
            isPasswordChangeSuccessful: undefined,
            passwordChangeMessage: undefined
        };

        this.validatePasswordReentry = this.validatePasswordReentry.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateCurrentPassword = this.validateCurrentPassword.bind(this);
        this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
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
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        const value = event.target.value;

        let isNewPasswordValid = this.state.newPasswordIsValid;
        let isNewPasswordReentryValid = this.state.newPasswordReentryIsValid;

        switch (event.target.name) {
            case 'newPassword':
                isNewPasswordValid = this.handlePasswordValidation(value);
                isNewPasswordReentryValid = this.validatePasswordReentry(this.state.newPasswordReentry, value);
                break;
            case 'newPasswordReentry':
                isNewPasswordReentryValid = this.validatePasswordReentry(value);
                break;
            default:
                break;
        }

        this.setState({
            [event.target.name]: value,
            newPasswordIsValid: isNewPasswordValid,
            newPasswordReentryIsValid: isNewPasswordReentryValid
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

    render() {
        let currentPasswordWarning, newPasswordWarning, newPasswordReentryWarning;

        let currentPasswordClass = 'form-group has-';
        let newPasswordClass = 'form-group has-';
        let newPasswordReentryClass = 'form-group has-';
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

        passwordChangeClass = this.state.isPasswordChangeSuccessful ? 'success-message' : 
            this.state.isPasswordChangeSuccessful === false ? 'error-message' : undefined;

        return (
            <div>
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
                            onChange={this.handleInputChange} />
                        {newPasswordWarning}
                    </div>

                    <div className={newPasswordReentryClass}>
                        <input type="password"
                            name="newPasswordReentry"
                            className="form-control"
                            placeholder="Retype new password"
                            value={this.state.newPasswordReentry}
                            onChange={this.handleInputChange} />
                        {newPasswordReentryWarning}
                    </div>

                    <button 
                        className='btn'>
                        Submit Change
                    </button>
                </form>
            </div>
        );
    }
}

export default EditAccountPasswordChange;
