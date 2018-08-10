/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import EditAccountSettings  from './EditAccountSettings';
import EditAccountSidebar from './EditAccountSidebar';
/* eslint-enable no-unused-vars */

class EditAccountMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarSelection: '',
        }

        this.onSelectSidebar = this.onSelectSidebar.bind(this);
    }

    /**
     * Updates the sidbar
     * @param {*} sidebarState 
     */
    onSelectSidebar(selection) {
        console.log(selection);
        this.setState({
            sidebarSelection: selection,
        });
    }

    render() {
        return (
            <div>
                <EditAccountSidebar 
                    onSelectSidebar={this.onSelectSidebar} />
                <EditAccountSettings />
            </div>
        )
    }

    
}

export default EditAccountMainPage;