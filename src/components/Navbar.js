/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink, BrowserRouter, Redirect } from 'react-router-dom';
import {
    Nav,
    Navbar,
    FormControl,
    FormGroup,
    Button,
    Glyphicon,
    Image
} from 'react-bootstrap';
import SmallLogo from '../media/small-logo.png';
import PlainGradientLogo from '../media/plain-gradient-logo.png';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
/* eslint-enable no-unused-vars */

class BounceNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToHome: false,
            query: undefined,
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
     * Redirects to the Home page with an empty search query when
     * the Bounce logo is clicked.
     */
    handleHomeClick() {
        this.setState({ goToHome: true });
        this.props.onSearch();
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
    handleSubmit(event) {
        event.preventDefault();
        // Trigger redirect to Home page so it can display search results
        this.setState({ goToHome: true });
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
                                <Image src={PlainGradientLogo}></Image>
                            </Navbar.Brand>
                        </NavLink>
                    </BrowserRouter>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl
                                    type='text'
                                    placeholder='Search'
                                    onChange={this.handleInput}
                                />
                            </FormGroup>
                            <Button type='submit'>
                                <Glyphicon glyph='search'></Glyphicon>
                            </Button>
                        </form>
                        <Nav pullRight>

                            <Link to='/create-account'>
                                <h3 className='white navbar-options'>START A CLUB</h3>
                            </Link>
                            <h4 className='white navbar-options'>SIGN UP</h4>
                            <h4 className='white navbar-options'>SIGN IN</h4>
                        </Nav>

                    </Navbar.Form>


                </Navbar.Collapse>


                {homeRedirect}
            </Navbar>
        );
    }
}

export default BounceNavbar;
