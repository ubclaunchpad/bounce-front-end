/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
/* eslint-enable no-unused-vars */

class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSettingsClicked: false
        }

        this.handleSettingsClick = this.handleSettingsClick.bind(this);
    }

    handleSettingsClick() {
        this.setState({isSettingsClicked: true});
    }

    render() {
        let welcomeMsg;
        let buttonClass = 'btn btn-primary';
        if (this.props.isNewAccount) {
            welcomeMsg = <p>Welcome, {this.props.username}!</p>;
        }
        if (this.state.isSettingsClicked) {
            return <Redirect to='/account-settings' />
        }
        return (
            <div>
                {welcomeMsg}
                <p>I'm a cool club</p>
                <button className={buttonClass}
                    onClick={this.handleSettingsClick}>Settings</button>
            </div>
        );
    }
}

export default Clubs;
