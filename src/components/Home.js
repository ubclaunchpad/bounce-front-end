/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button, Row, Col, Image
} from 'react-bootstrap';

import Clubs from './clubs/Clubs';
import LargeLogo from '../media/large-logo.png';
import HeroLogo from '../media/hero-logo.png';
import '../css/Home.css';
import Background from '../media/hero-back.png';
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
                searchQuery={this.props.searchQuery}
                client={this.props.client}
            />;
        }

        return (
            <div className='hero-banner'>
                <div className='container home white'>

                    <Row>
                        <Col sm={6}>
                            <div className='hero-text-spacing'>
                                <h1 className='white'><b>HUDDLE</b></h1>

                                <h2 className='white'>Find a club that matches you</h2>
                                <br />
                                <h3 className='white'>Browse events, get involved, and make new friends!</h3>
                                <br />
                                <br />
                                <Link to='/sign-in'>
                                    <Button bsStyle='primary'>Explore Clubs</Button>
                                </Link>
                            </div>
                            {/*
                            <Link to='/create-account'>
                                <Button>Create Account</Button>
                            </Link>
                           */}
                        </Col>
                        <Col sm={6}>
                            <Image
                                src={HeroLogo}
                                alt='logo'
                                className='large-logo'
                                responsive
                            />
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default Home;
