/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../../css/EditAccount.css';
/* eslint-enable no-unused-vars */

class EditAccountSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelected: '',
        };
    }

    render() {
        return (
            <div className="edit-account-sidebar">
                <h2 className="sidebar-label">Setting</h2>
                <ul>
                    <li><a>Account Settings</a></li>
                    <li><a>Privacy</a></li>
                </ul>
            </div>
        );
    }
}

export default EditAccountSidebar;
