/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
/* eslint-enable no-unused-vars */
import {
    CLUB_ALREADY_EXISTS, UNEXPECTED_ERROR
} from '../constants';
import {
    FormGroup,
    Label,
    Button,
    Alert,
    PageHeader
} from 'react-bootstrap';


class CreateClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            websiteUrl: '',
            facebookUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            errorMsg: undefined,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /**
     * Handles the event that occurs when a user hits submit on the 'Create
     * Club' form by attempting to create the new club.
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        this.props.client.createClub(
            this.state.name,
            this.state.description,
            this.state.websiteUrl,
            this.state.facebookUrl,
            this.state.instagramUrl,
            this.state.twitterUrl
        ).then(response => {
            if (response.ok) {
                // TODO: Redirect to the Club page
            } else if (response.status == 409) {
                // A club with that name already exists
                this.setState({ errorMsg: CLUB_ALREADY_EXISTS });
            } else {
                // An unexpected error occurred
                this.setState({ errorMsg: UNEXPECTED_ERROR });
            }
        }).catch(() => {
            this.setState({ errorMsg: UNEXPECTED_ERROR });
        });
    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInput(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        let errorMsg;
        if (this.state.errorMsg) {
            errorMsg = <Alert bsStyle='warning'> {this.state.errorMsg} </Alert>;
        }
        return (
            <div className='container'>
                <PageHeader>Create a Club</PageHeader>

                {errorMsg}
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Name</Label>
                        <input type='text'
                            name='name'
                            placeholder='Name'
                            className='form-control'
                            value={this.state.name}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Description</Label>
                        <input type='text'
                            name='description'
                            placeholder='Description'
                            className='form-control'
                            value={this.state.description}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Website Url</Label>
                        <input type='text'
                            name='websiteUrl'
                            placeholder='Website Url'
                            className='form-control'
                            value={this.state.websiteUrl}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Facebook Url</Label>
                        <input type='text'
                            name='facebookUrl'
                            placeholder='Facebook Url'
                            className='form-control'
                            value={this.state.facebookUrl}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Instagram Url</Label>
                        <input type='text'
                            name='instagramUrl'
                            placeholder='Instagram Url'
                            className='form-control'
                            value={this.state.instagramUrl}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Twitter Url</Label>
                        <input type='text'
                            name='twitterUrl'
                            placeholder='Twitter Url'
                            className='form-control'
                            value={this.state.twitterUrl}
                            onChange={this.handleInput} />
                    </FormGroup>

                    <Button
                        bsStyle='primary'
                        onClick={this.handleSubmit}>
                        Create Club
                    </Button>
                </form>
            </div>
        );
    }
}

export default CreateClub;
