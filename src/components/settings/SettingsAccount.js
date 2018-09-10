/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import SettingsAccountPasswordChange from './SettingsAccountPasswordChange';
import SettingsAccountEmailChange from './SettingsAccountEmailChange';
import '../../css/Settings.css';
/* eslint-enable no-unused-vars */

class SettingsAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="settings-account-settings">
                <h2>Account Settings</h2>

                <SettingsAccountPasswordChange 
                    client={this.props.client}
                    userName={this.props.userName} />

                <SettingsAccountEmailChange
                    client={this.props.client}
                    userName={this.props.userName} />
            </div>
        );
    }
}

export default SettingsAccount;
