/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './CreateAccountForm.css';
// import { template } from 'handlebars';
/* eslint-enable no-unused-vars */

class CreateAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('here');
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="CreateAccountForm">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="formInput">Create an account</h1>

                    <label className="inputLabel formInput">Your Name</label>
                    <input type="text" name="userName" 
                        className="formInput"
                        id="userName"
                        value={this.state.userName}
                        onChange={this.handleInputChange} />

                    <label className="inputLabel formInput">Your Email</label>
                    <input type="text" name="userEmail" 
                        className="formInput"
                        id="userEmail"
                        value={this.state.userEmail}
                        onChange={this.handleInputChange} />

                    <label className="inputLabel formInput">Your Password</label>
                    <input type="password" name="userPassword" 
                        className="formInput"
                        id="userPassword"
                        value={this.state.userPassword}
                        onChange={this.handleInputChange} />

                    <div className="checkAgreement">
                        <input type="checkbox" />
                        <label id="checkboxLabel" >
                            By clicking create an account, I agree to the terms and conditions
                        </label>
                    </div>

                    <button>Sign Up</button>
                
                </form>
            </div>
        );
    }
}

export default CreateAccountForm;