/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Nav,
    NavItem,
    DropdownButton,
    MenuItem,
    Glyphicon
} from 'react-bootstrap';
import '../css/Navbar.css';
/* eslint-enable no-unused-vars */

class NavbarSignedIn extends Component {
    constructor() {
        super();
        this.state = {
            goToSettings: false,
            goToProfile: false
        };

        this.handleSettingsClick = this.handleSettingsClick.bind(this);
    }

    componentDidUpdate() {
        if (this.state.goToSettings) {
            this.setState({ goToSettings: false });
        }
    }

    handleSettingsClick() {
        this.setState({ goToSettings: true });
    }

    render() {
        let pageRedirect;
        if (this.state.goToSettings) {
            pageRedirect = <Redirect to='/account-settings'></Redirect>;
        }

        return (
            <Nav pullRight>
                {pageRedirect}
                <NavItem>
                    <DropdownButton id="account"
                        eventKey={3}
                        title={<Glyphicon glyph="user" />}>
                        <MenuItem
                            eventKey={3.2}
                            onClick={this.handleSettingsClick}>
                            Settings
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem
                            eventKey={3.3}
                            onClick={this.props.handleLogOut}>
                            Log Out
                        </MenuItem>
                    </DropdownButton>
                </NavItem>
            </Nav>
        );
    }
}

export default NavbarSignedIn;
