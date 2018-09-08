/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import EditAccountSidebar from './EditAccountSidebar';
import EditAccountPasswordChange from './EditAccountPasswordChange';
import EditAccountEmailChange from './EditAccountEmailChange';
/* eslint-enable no-unused-vars */

// MikeUserTest@hotmail.com
class EditAccountMainPage extends Component {
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
                <EditAccountSidebar 
                    onSelectSidebar={this.onSelectSidebar} />

                <div className="edit-account-settings">
                    <h2>Account Settings</h2>

                    <EditAccountPasswordChange 
                        client={this.props.client}
                        userName={this.state.username}/>

                    <EditAccountEmailChange
                        client={this.props.client}
                        userName={this.state.username}/>
                </div>
            </div>
        );
    }

    
}

export default EditAccountMainPage;