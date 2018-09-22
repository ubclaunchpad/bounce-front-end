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
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    <Button
                        bsClass='btn btn-secondary'
                        onClick={this.props.handleMyClubsClick}>
                        My Clubs
                    </Button>
                </NavItem>
                <NavItem eventKey={2} href="#">
                    <Button
                        bsClass='btn btn-secondary'
                        onClick={this.props.handleExploreClick}>
                        Explore
                    </Button>
                </NavItem>
                <NavDropdown 
                    noCaret
                    eventKey={3}
                    title={
                        <div>
                            <Image src={UserDefaultLogo}/>
                        </div>
                    } 
                    id="profile-dropdown" >
                    <MenuItem eventKey={3.1}>Profile</MenuItem>
                    <MenuItem eventKey={3.2}>Settings</MenuItem>

                </NavDropdown>
            </Nav>
        );
    }

}

export default NavbarSignedIn;
