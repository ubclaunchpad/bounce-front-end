/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, PageHeader } from 'react-bootstrap';

import Cards from '../util/Cards';
/* eslint-enable no-unused-vars */
import { connect } from 'react-redux';

class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: undefined,
        };
    }

    render() {
        return (
            <div className='container page'>
                {this.props.isNewAccount &&
                    <Alert bsStyle='success'>
                        Welcome, {this.props.client.getUsername()}!
                    </Alert>
                }
                {this.state.errorMsg &&
                    <Alert bsStyle='warning'> {this.state.errorMsg} </Alert>
                }

                <PageHeader>Explore Clubs</PageHeader>
                <Cards items={this.props.clubs} />
            </div>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        clubs: store.clubsReducer.clubs
    };
};

export default connect(mapStoreToProps)(Clubs);
