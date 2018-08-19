/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    INVALID_INFO,
    PASSWORD_WARNING,
    EMAIL_WARNING,
} from '../../constants';
import '../../css/EditPage.css'
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
            emailPasswordVerify: '',
            currentPasswordIsValid: undefined,
            newPasswordIsValid: undefined,
            newPasswordReentryIsValid: undefined,
            newEmailIsValid: undefined,
            newEmailReentryIsValid: undefined,
            emailPasswordVerifyIsValid: undefined
        }

        this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
        this.handleEmailChangeSubmit = this.handleEmailChangeSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordReentry = this.validatePasswordReentry.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateEmailReentry = this.validateEmailReentry.bind(this);
    }

    /*********User Input Styling************
    Input Validation (3 states):
        - undefined (initial state / hide error message)
        - true (defined state)
        - false (defined state)
    - all inputs starts at undefined state
        - input change at undefined state will not produce a true or false validation state
        - onBlur will generally produce a true or false validation state
    newPassword:
        - once this input is given a defined state, it will always be either true or false
    newPasswordReentry:
        - a defined state is given only if user unselects from the input
        - changing input will change state back to undefined
    newEmail:
        - 
    ***************************************/

    /**
     * Revalidate password inputs. If there is undefined or false states, set password inputs to empty
     * @param {Event} event 
     */
    handlePasswordChangeSubmit(event) {
        event.preventDefault();

        let passwordVerify = this.validateCurrentPassword(this.state.currentPassword);

        this.handleSetState('newPasswordIsValid',
            this.validatePassword(this.state.newPassword));
        this.handleSetState('newPasswordReentryIsValid',
            this.validatePasswordReentry());

        if (!passwordVerify || !this.state.newPasswordIsValid
            || !this.state.newPasswordReentryIsValid) {
            this.setState({
                'currentPassword': '',
                'newPassword': '',
                'newPasswordReentry': ''
            })
            return;
        }
    }

    /**
     * Revalidate email inputs. If there is undefined or false states, set re-entered email inputs to empty
     * @param {Event} event 
     */
    handleEmailChangeSubmit(event) {
        event.preventDefault();

        let passwordVerify = this.validateCurrentPassword(this.state.emailPasswordVerify);
        
        this.handleSetState('newEmailIsValid',
            this.validateEmail());
        this.handleSetState('newEmailReentryIsValid', 
            this.validateEmailReentry());

        if (!passwordVerify || !this.state.newEmailIsValid
            || !this.state.newEmailReentryIsValid) {
            this.setState({
                newEmail: '',
                newEmailReentry: '',
                emailPasswordVerify: ''
            })
            return;
        }
    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        // Make sure the value matches the requirements for its field
        const value = event.target.value;
        switch (event.target.name) {
            case 'newPassword':
                if (this.state.newPasswordIsValid !== undefined) {
                    this.setState({
                        'newPasswordIsValid': this.validatePassword(value)
                    });
                } else {
                    this.setState({
                        'newPasswordIsValid': undefined
                    });
                }
                break;
            case 'newPasswordReentry':
                this.setState({
                    'newPasswordReentryIsValid': undefined
                });
                break;
            case 'newEmail':
                if (value.length === 0 || this.state.newEmailIsValid === undefined){
                    this.setState({
                        'newEmailIsValid': undefined
                    });
                } else {
                    this.setState({
                        'newEmailIsValid': this.validateEmail(value)
                    });
                }
                break;
            case 'newEmailReentry':
                if (value.length === 0){
                    this.setState({
                        'newEmailReentryIsValid': undefined
                    });
                } else if (this.validateEmailReentry(value)){
                    this.setState({
                        'newEmailReentryIsValid': true
                    });
                } else {
                    this.setState({
                        'newEmailReentryIsValid': undefined
                    });
                }
                break;
            default:
                break;
        }
        this.setState({
            [event.target.name]: value,
        });
    }

    /**
     * Update component state when user unfocus from the input field
     * @param {Event} event 
     */
    handleOnBlur(event) {
        switch (event.target.name) {
            case 'newPassword':
                if (this.state.newPasswordIsValid !== undefined 
                    || this.state.newPassword.length > 0){
                    this.setState({
                        'newPasswordIsValid': this.validatePassword(this.state.newPassword)
                    });
                } else {
                    this.setState({
                        'newPasswordIsValid': undefined
                    });
                }
                break;
            case 'newPasswordReentry':
                if (this.state.newPasswordReentry.length === 0){
                    this.setState({
                        'newPasswordReentryIsValid': undefined
                    });
                } else {
                    this.setState({
                        'newPasswordReentryIsValid': this.validatePasswordReentry()
                    });
                }
                break;
            case 'newEmail':
                if (this.state.newEmail.length === 0){
                    this.setState({
                        'newEmailIsValid': undefined
                    });
                } else{
                    this.setState({
                        'newEmailIsValid': this.validateEmail(this.state.newEmail)
                    });
                }
                break;
            case 'newEmailReentry':
                if (this.state.newEmailReentry.length === 0){
                    this.setState({
                        'newEmailReentryIsValid': undefined
                    });
                } else{
                    this.setState({
                        'newEmailReentryIsValid': this.validateEmailReentry(this.state.newEmailReentry)
                    });
                }
                break;
            default:
                break;
        }
    }

    /**
     * Set value to element state
     * @param {String} element 
     * @param {*} value 
     */
    handleSetState(element, value) {
        this.setState({[element] : value});
    }

    /**
     * Return true if current password is valid
     */
    validateCurrentPassword(password) {
        return true;
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
     * Return true if new password and reentered new password is equivalent
     */
    validatePasswordReentry() {
        return this.state.newPasswordReentry === this.state.newPassword;
    }

    /**
     * If emailInput is defined, return true if emailInput is valid and false otherwise.
     * Else, check if the state of newEmail is valid, return true if valid and false otherwise.
     * @param {String} emailInput
     */
    // validateEmail(email) {
    validateEmail(emailInput) {
        let email = emailInput || this.state.newEmail;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    /**
     * Return true if emailReentryInput is equivalent to the state of newEmail.
     * If emailReentryInput is undefined, use the state of newEmailReentry
     * @param {String} emailReentryInput 
     */
    validateEmailReentry(emailReentryInput) {
        let emailReentry = emailReentryInput || this.state.newEmailReentry;
        return emailReentry === this.state.newEmail;
    }

    render() {
        let passwordWarning, newPasswordWarning, newPasswordReentryWarning, newEmailWarning, newEmailReentryWarning;
        let passwordButtonClass = 'btn';
        let passwordClass = 'form-group has-';
        let newPasswordClass = 'form-group has-';
        let newPasswordReentryClass = 'form-group has-';
        let newEmailClass = 'form-group has-';
        let newEmailReentryClass = 'form-group has-';

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
        } else {
            // produce initial styling when undefined
        }

        if (this.state.newEmailIsValid !== undefined) {
            if (this.state.newEmailIsValid) {
                newEmailClass += 'success';
            } else {
                newEmailClass += 'error';
                newEmailWarning = <span>{EMAIL_WARNING}</span>;
            }
        } else {
            // produce initial styling when undefined
        }

        if (this.state.newEmailReentryIsValid !== undefined) {
            if (this.state.newEmailReentryIsValid) {
                newEmailReentryClass += 'success';
            } else {
                newEmailReentryClass += 'error';
                newEmailReentryWarning = <span>{'Retyped email does not match new email'}</span>
            }
        } else {
            // produce initial styling when undefined
        }

        return (
            <div className="editPage">
                <form onSubmit={this.handlePasswordChangeSubmit}>
                    <h3>Password Change</h3>

                    <div className={passwordClass}>
                        <input type="password"
                            name="currentPassword"
                            className="form-control"
                            placeholder="Current password"
                            value={this.state.currentPassword}
                            onChange={this.handleInputChange} />
                        {passwordWarning}
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
                        className={passwordButtonClass} >
                        Submit Change
                    </button>
                </form>

                <form onSubmit={this.handleEmailChangeSubmit}>
                    <h3>Email Change</h3>
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

                    <div className={passwordClass}>
                        <input type="password"
                            name="emailPasswordVerify"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange} />
                        {passwordWarning}
                    </div>
                    <button
                        className="btn">
                        Submit Change
                    </button>
                </form>
            </div>
        )
    }
}

export default EditAccountSettings;
