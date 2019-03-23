/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button, Row, Col, Image
} from 'react-bootstrap';

import Clubs from './clubs/Clubs';
import LargeLogo from '../media/large-logo.png';
import {connect} from 'react-redux';
/* eslint-enable no-unused-vars */

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.client.isSignedIn() || this.props.searchQuery) {
            // Display clubs when the user is signed in or if they are searching
            return <Clubs
                isNewAccount={this.props.isNewAccount}
                client={this.props.client}
            />;
        }

        return (
            <div className='container home page'>
                <Row>
                    <Col sm={6}>
                        <h1>Huddle</h1>
                        <h2>Find a club that matches your interests.</h2>
                        <p>Find a club, get involved, and make new friends!</p>
                        <br />
                        <Link to='/sign-in'>
                            <Button bsStyle='primary'>Explore Clubs</Button>
                        </Link>
                        <Link to='/create-account'>
                            <Button>Create Account</Button>
                        </Link>
                    </Col>
                    <Col sm={6}>
                        <Image
                            src={LargeLogo}
                            alt='logo'
                            className='large-logo'
                            responsive
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
const mapStoreToProps = (store) => {
    return {
        searchQuery: store.clubsReducer.searchQuery
    };
};


export default connect(mapStoreToProps)(Home);
