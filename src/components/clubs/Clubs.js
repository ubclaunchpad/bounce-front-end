/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, PageHeader } from 'react-bootstrap';


import { UNEXPECTED_ERROR, NO_CLUBS_FOUND } from '../../constants';
import Cards from '../util/Cards';
/* eslint-enable no-unused-vars */

import { changeClub } from '../../actions/changeClub.js';
import { changeQuery} from '../../actions/changeQuery.js';
import { connect }   from 'react-redux';
class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //  clubs: [],
            //  searchQuery: props.searchQuery,
            errorMsg: undefined,
        };

        this.search = this.search.bind(this);
    }

    /**
     * Updates component state when new props are received from the parent.
     * @param {Object} props
     */
    componentWillReceiveProps(props) {
        //  this.setState({ searchQuery: props.searchQuery });
        this.props.changeQuery(props.searchQuery);
        //store.dispatch(changeQuery(props.searchQuery));
        this.search();
    }

    /**
     * Searches for clubs that match the current query and updates the
     * component state with the results.
     */
    search() {
        // Do nothing if there is no query
        if (!this.props.searchQuery) return;

        this.props.client.searchClubs(this.props.searchQuery)
            .then(result => {
                if (result.ok) {
                    // Display results
                    result.json().then(body => {
                        this.setState({errorMsg: undefined });
                        this.props.changeClub(body.results);
                        //store.dispatch(changeClub(body.results));
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
        clubs:store.clubsReducer.clubs,
        searchQuery: store.clubsReducer.searchQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        changeClub: (payload) => dispatch(changeClub(payload)),
        changeQuery: (payload) => dispatch(changeQuery(payload))
    };
};


export default connect(mapStoreToProps,mapDispatchToProps)(Clubs);
