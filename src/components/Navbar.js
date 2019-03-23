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
import NavbarSignedIn from './NavbarSignedIn';
import NavbarLoggedOut from './NavbarLoggedOut';
import {connect} from 'react-redux';
import { changeQuery } from '../actions/changeQuery';
import { changeClubs } from '../actions/changeClubs.js';
import { UNEXPECTED_ERROR, NO_CLUBS_FOUND } from '../constants';
/* eslint-enable no-unused-vars */

class BounceNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToHome: false,
            goToSignIn: false,
            goToMyClubs: false,
            goToExplore: false,
            signedIn: false
        };

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /**
     * Set goTo props to false after component updates so page
     * does not rerender on every component update
     */
    componentDidUpdate() {
        if (this.state.goToHome) {
            this.setState({ goToHome: false });
        }
        if (this.state.goToSignIn) {
            this.setState({ goToSignIn: false });
        }
        if (this.state.goToMyClubs) {
            this.setState({ goToMyClubs: false });
        }
        if (this.state.goToExplore) {
            this.setState({ goToExplore: false });
        }
    }

    /**
     * Set client token to null, allowing navbarComponent to render
     * NavbarLoggedOut instead of NavbarSignedIn
     */
    handleLogOut() {
        this.props.changeQuery('');
        this.props.client.signOut();
    }

    /**
     * Redirects to the Home page with an empty search query when
     * the Bounce logo is clicked.
     */
    handleHomeClick() {
        this.props.changeQuery('');
        this.setState({ goToHome: true});
    }

    /**
     * Redirects to Sign In page with an empty search query when
     * Sign In button is clicked.
     */
    handleSignInClick() {
        this.props.changeQuery('');
        this.setState({ goToSignIn: true });
    }

    /**
     * Updates component state when the user types in the search bar.
     * @param {Event} event
     */
    handleInput(event) {
        event.preventDefault();
        this.props.changeQuery(event.target.value);
    }

    /**
     * Searches for clubs when the user hits the search button.
     */
    handleSubmit(event) {
        event.preventDefault();
        // Do nothing if there is no query
        if (!this.props.searchQuery) return;

        this.props.client.searchClubs(this.props.searchQuery)
            .then(result => {
                if (result.ok) {
                    // Display results
                    result.json().then(body => {
                        this.props.changeClubs(body.results.map(item => {
                            return Object.assign(item, {link: `/clubs/${item.name}`});
                        }));
                        // Trigger redirect to Home page so it can display search results
                        this.setState({ goToHome: true });
                    });
                } else if (result.status === 404) {
                    this.setState({ errorMsg: NO_CLUBS_FOUND });
                } else {
                    this.setState({ errorMsg: UNEXPECTED_ERROR });
                }
            }).catch(() => {
                this.setState({ errorMsg: UNEXPECTED_ERROR });
            });
    }

    render() {

        let pageRedirect;
        let navbarComponent;
        if (this.state.goToHome) {
            pageRedirect = <Redirect to='/'></Redirect>;
        }
        if (this.state.goToSignIn) {
            pageRedirect = <Redirect to='/sign-in'></Redirect>;
        }

        navbarComponent = this.props.client.isSignedIn() ?
            <NavbarSignedIn
                handleLogOut={this.handleLogOut} /> :
            <NavbarLoggedOut
                handleSignInClick={this.handleSignInClick} />;

        return (
            <Navbar id='navbar' toggleNavKey = {1} fluid>
                {pageRedirect}
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
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            <Navbar.Form>
                                <FormGroup>
                                    <FormControl
                                        type='text'
                                        placeholder='Search'
                                        value = {this.props.searchQuery}
                                        onChange={this.handleInput}
                                    />
                                </FormGroup>
                                <Button type='submit'>
                                    <Glyphicon
                                        glyph='search'
                                        onClick={this.handleSubmit}>
                                    </Glyphicon>
                                </Button>
                            </Navbar.Form>
                        </NavItem>
                    </Nav>
                    {navbarComponent}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        searchQuery: store.clubsReducer.searchQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeClubs: (payload) => dispatch(changeClubs(payload)),
        changeQuery: (payload) => dispatch(changeQuery(payload))
    };
};

export default connect(mapStoreToProps,mapDispatchToProps)(BounceNavbar);
