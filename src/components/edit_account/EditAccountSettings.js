/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../../css/EditPage.css'
/* eslint-enable no-unused-vars */

class EditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            newPasswordReentry: '',
            email: '',
            emailReentry: '',
            emailPasswordVerify: '',
        }

        this.handleChangePasswordSubmit = this.handleChangePasswordSubmit.bind(this);
        this.handleChangeEmailSubmit = this.handleChangeEmailSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChangePasswordSubmit() {

    }

    handleChangeEmailSubmit() {

    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="editPage">
                <form onSubmit={this.handleSubmit}>
                    <h3>Password Change</h3>
                    <input type="password"
                        name="currentPassword"
                        className="editAccountFormInput"
                        placeholder="Current password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <input type="password"
                        name="newPassword"
                        className="editAccountFormInput"
                        placeholder="New password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <input type="password"
                        name="newPasswordReentry"
                        className="editAccountFormInput"
                        placeholder="Retype new password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <button className="passwordSubmitButton">Submit Change</button>
                </form>

                <form>
                <h3>Email Change</h3>
                <input type="email"
                    name="email"
                    value={this.state.email}
                    className="editAccountFormInput"
                    placeholder="New email"
                    onChange={this.handleInputChange}/>
                <input type="email"
                    name="emailReentry"
                    className="editAccountFormInput"
                    value={this.state.email}
                    placeholder="Retype new email"
                    onChange={this.handleInputChange}/>
                <input type="password"
                    name="emailPasswordVerify"
                    className="editAccountFormInput"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange} />
                </form>
                <button>Submit Change</button>
            </div>
        )
    }
}

export default EditAccountSettings;
