/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import SignIn from './accounts/SignIn';
import BounceNavbar from './Navbar';
import Home from './Home';
import ViewClub from './clubs/ViewClub';
import CreateAccount from './accounts/CreateAccount';
import CreateClub from './clubs/CreateClub';
import '../css/App.css';
import AccountSettings from './accounts/AccountSettings';
import {changeQuery} from '../actions/changeQuery';
import { connect }   from 'react-redux';

/* eslint-enable no-unused-vars */

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewAccount: false,
        
        };

        this.onSignIn = this.onSignIn.bind(this);
        this.getSignInPage = this.getSignInPage.bind(this);
        this.getCreateAccountPage = this.getCreateAccountPage.bind(this);
        this.getCreateClubPage = this.getCreateClubPage.bind(this);
        this.getViewClubPage = this.getViewClubPage.bind(this);
        this.getHomePage = this.getHomePage.bind(this);
        this.getAccountSettingsPage = this.getAccountSettingsPage.bind(this);
    }

    /**
     * Updates the state to indicate that the user is signed in.
     * @param {Boolean} isNewAccount whether or not this account was just created
     */
    onSignIn(isNewAccount) {
        this.setState({isNewAccount: isNewAccount});
    }

    /**
     * Returns a SignIn component.
     */
    getSignInPage() {
        return <SignIn
            onSignIn={this.onSignIn}
            client={this.props.client}
        />;
    }

    /**
     * Returns a SignIn component that defaults to the CreateAccount form.
     */
    getCreateAccountPage() {
        return <CreateAccount
            onSignIn={this.onSignIn}
            client={this.props.client}
        />;
    }

    /**
     * Returns the CreatClub page.
     */
    getCreateClubPage() {
        return <CreateClub client={this.props.client} />;
    }

    /**
     * Returns the ViewClub page.
     * @param {Object} filter provides the club name based on the URI
     */
    getViewClubPage(filter) {
        const id = decodeURIComponent(filter.match.params.id);
        return <ViewClub
            client={this.props.client}
            id={id}
        />;
    }

    /**
     * Returns the Home page.
     */
    getHomePage() {
        return <Home
            isNewAccount={this.state.isNewAccount}
            client={this.props.client}

        />;
    }


    /**
     * Returns an AccountSettings page.
     */
    getAccountSettingsPage() {
        return <AccountSettings
            client={this.props.client}
        />;
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <BounceNavbar
                        client={this.props.client}
                        onSearch={this.props.searchQuery}
                    />
                    <Switch>
                        <Route exact path='/' render={this.getHomePage} />
                        <Route path='/sign-in' render={this.getSignInPage} />
                        <Route path='/create-club' render={this.getCreateClubPage} />
                        <Route path='/clubs/:id' component={this.getViewClubPage} />
                        <Route path='/create-account' render={this.getCreateAccountPage} />
                        <Route path='/account-settings' render={this.getAccountSettingsPage} />
                        <Route path='*' render={() => <Redirect to='/' />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        searchQuery: store.clubsReducer.searchQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        changeQuery: (payload) => dispatch(changeQuery(payload))
    };
};

export default connect(mapStoreToProps,mapDispatchToProps)(App);
