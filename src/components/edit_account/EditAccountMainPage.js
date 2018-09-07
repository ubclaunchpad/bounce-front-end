/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import EditAccountSettings  from './EditAccountSettings';
import EditAccountSidebar from './EditAccountSidebar';
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
     * Updates the sidebar
     * @param {*} sidebarState 
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
                <EditAccountSettings
                    client={this.props.client}
                    userName={this.state.username}/>
            </div>
        );
    }

    
}

export default EditAccountMainPage;