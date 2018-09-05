/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, PageHeader } from 'react-bootstrap';

import { UNEXPECTED_ERROR, NO_CLUBS_FOUND } from '../../constants';
/* eslint-enable no-unused-vars */

class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubs: [],
            errorMsg: undefined,
        };
    }

    /**
     * Fetches clubs to display
     */
    componentDidMount() {
        // No search query provided
        if (!this.props.searchQuery) {
            // TODO: display interesting clubs
            return;
        }

        // Display search results
        this.props.client.searchClubs(this.props.searchQuery)
            .then(result => {
                if (result.ok) {
                    // Display results
                    result.json().then(body => {
                        this.setState({ clubs: body, errorMsg: undefined });
                    });
                } else if (result.status == 404) {
                    this.setState({ errorMsg: NO_CLUBS_FOUND });
                } else {
                    this.setState({ errorMsg: UNEXPECTED_ERROR });
                }
            }).catch(() => {
                this.setState({ errorMsg: UNEXPECTED_ERROR });
            });
    }

    render() {
        // Display a welcome message if the user just signed up
        let welcomeMsg;
        if (this.props.isNewAccount) {
            welcomeMsg = (
                <Alert bsStyle='primary'>
                    Welcome, {this.props.username}!
                </Alert>
            );
        }

        // Display error message if necessary
        let errorMsg;
        if (this.state.errorMsg) {
            errorMsg = <Alert bsStyle='warning'> {this.state.errorMsg} </Alert>;
        }

        // Create club cards
        const clubs = this.state.clubs.map(club => {
            return (
                <div className='card' key={club.id}>
                    <div className='card-body' key={club.id}>
                        <h6
                            key={club.id}
                            className='card-title'>
                            {club.name}
                        </h6>
                        <p>{club.description}</p>
                    </div>
                </div>
            );
        });
        let rows = [];
        for (let row = 0; row < clubs.length / 3 - 1; row++) {
            let cols = [];
            for (let col = 0; col < 3; col++) {
                cols.push(clubs[row * 3 + col]);
            }
            rows.push(cols);
        }

        return (
            <div>
                {welcomeMsg}
                {errorMsg}
                <PageHeader>Explore Clubs</PageHeader>
                {rows}
            </div>
        );
    }
}

export default Clubs;
