/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink, BrowserRouter, Redirect } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    FormControl,
    FormGroup,
    Button,
    Glyphicon,
    Image
} from 'react-bootstrap';
import SmallLogo from '../media/small-logo.png';
import '../css/Navbar.css';
/* eslint-enable no-unused-vars */

class BounceNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToHome: false,
            query: '',
        };

        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidUpdate() {
        if (this.state.goToHome) {
            this.setState({ goToHome: false });
        }
    }

    /**
     * Redirects to the Home page when the Bounce logo is clicked.
     */
    handleHomeClick() {
        this.setState({ goToHome: true });
    }

    /**
     * Updates component state when the user types in the search bar.
     * @param {Event} event
     */
    handleInput(event) {
        event.preventDefault();
        this.setState({ query: event.target.value });
    }

    /**
     * Searches for clubs when the user hits the search button.
     */
    handleSubmit() {
        this.props.onSearch(this.state.query);
    }

    render() {
        let homeRedirect;
        if (this.state.goToHome) {
            homeRedirect = <Redirect to='/'></Redirect>;
        }
        return (
            <Navbar id='navbar' toggleNavKey={1} fluid>
                <Navbar.Header>
                    <BrowserRouter>
                        <NavLink to='/' onClick={this.handleHomeClick}>
                            <Navbar.Brand>
                                <Image src={SmallLogo}></Image>
                            </Navbar.Brand>
                        </NavLink>
                    </BrowserRouter>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form>
                        <FormGroup>
                            <FormControl
                                type='text'
                                placeholder='Search'
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                        <Button type='submit' onClick={this.handleSubmit}>
                            <Glyphicon glyph='search'></Glyphicon>
                        </Button>
                    </Navbar.Form>
                </Navbar.Collapse>
                {homeRedirect}
            </Navbar>
        );
    }
}

export default BounceNavbar;
