/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import SettingsSidebar from './SettingsSidebar';
import SettingsAccount from './SettingsAccount';
/* eslint-enable no-unused-vars */

class SettingsMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarSelection: '',
            username: 'MikeUserTest'
        };

        this.onSelectSidebar = this.onSelectSidebar.bind(this);
    }

    /**
     * 
     * @param {string} selection 
     */
    onSelectSidebar(selection) {
        this.setState({
            sidebarSelection: selection,
        });
    }
    
    render() {
        return (
            <div>
                <SettingsSidebar 
                    onSelectSidebar={this.onSelectSidebar} />
                <SettingsAccount
                    client={this.props.client}
                    userName={this.state.username} />
            </div>
        );
    }

    
}

export default SettingsMainPage;