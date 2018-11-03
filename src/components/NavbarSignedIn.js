/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import '../css/Navbar.css';
import UserDefaultLogo from '../media/user-default-logo.png';
import {
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Button,
    Image
} from 'react-bootstrap';
/* eslint-enable no-unused-vars */

class NavbarSignedIn extends Component {
    render() {
        return (
            <Nav pullRight>
                <NavItem eventKey={1} href="#"
                    className="navButton">
                    <Button
                        bsClass='btn btn-secondary'
                        onClick={this.props.handleMyClubsClick}>
                        My Clubs
                    </Button>
                </NavItem>
                <NavItem eventKey={2} href="#"
                    className="navButton">
                    <Button
                        bsClass='btn btn-secondary'
                        onClick={this.props.handleExploreClick}>
                        Explore
                    </Button>
                </NavItem>
                <NavDropdown
                    eventKey={3}
                    title={
                        <div className="accountButton">
                            <Image src={UserDefaultLogo}/>
                            <span>Account</span>
                        </div>
                    } 
                    id="profile-dropdown" >
                    <MenuItem eventKey={3.1}>Profile</MenuItem>
                    <MenuItem eventKey={3.2}>Settings</MenuItem>
                    <MenuItem divider />
                    <MenuItem 
                        eventKey={3.3}
                        onClick={this.props.handleLogOut} >
                            Log Out
                    </MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
}

export default NavbarSignedIn;
