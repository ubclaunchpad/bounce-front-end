/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../../css/EditPage.css';
/* eslint-enable no-unused-vars */

class EditAccountSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelected: '',
        };
    }

    handleOnclick() {
        this.props.onSelectSidebar;
        this.props.sidebarSelectionOptions;
    }

    render() {
        return (
            <div className="sidebar">
                <h3 className="sidebarLabel">Profile Settings</h3>
                <div className="selectionContainer" 
                    onClick={() => this.props.onSelectSidebar('Profile')}>
                    <span className="selectionWord">
                        Profile
                    </span>
                </div>
                <div className="selectionContainer">
                    <span className="selectionWord">
                        Clubs Affiliation
                    </span>
                </div>
                <div className="selectionContainer">
                    <span className="selectionWord">
                        Interest
                    </span>
                </div>
                <hr/>
                <h3 className="sidebarLabel">Account Setting</h3>
                <div className="selectionContainer"
                    onClick={() => this.props.onSelectSidebar('Account')}>
                    <span className="selectionWord">
                        Account
                    </span>
                </div>
                <div className="selectionContainer">
                    <span className="selectionWord">
                        Privacy
                    </span>
                </div>
            </div>
        );
    }
}

export default EditAccountSidebar;
