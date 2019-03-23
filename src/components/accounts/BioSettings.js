/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, Button, Label, FormGroup } from 'react-bootstrap';

import { UNEXPECTED_ERROR } from '../../constants';
import { tempSetState } from '../utils';
import '../../css/Settings.css';
/* eslint-enable no-unused-vars */

class BioSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBio: '',
            newBio: '',
            success: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBioChangeSubmit = this.handleBioChangeSubmit.bind(this);
    }

    /**
     * Updates the component state when the user types in an input field.
     * @param {Event} event
     */
    handleInputChange(event) {
        const value = event.target.value;

        this.setState({
            [event.target.name]: value,
        });
    }

    async handleBioChangeSubmit(event) {
        event.preventDefault();

        const response = await this.props.client.updateUser(
            this.props.client.getUsername(),
            undefined,
            undefined,
            undefined,
            this.state.newBio);
        tempSetState(this, 'success', await response.ok);
    }

    render() {
        let newBioClass;
        if (this.state.success) {
            newBioClass = 'has-success';
        } else if (this.state.success !== null) {
            newBioClass = 'has-error';
        }
        return (
            <div>
                <form onSubmit={this.handleBioChangeSubmit}>
                    {this.state.success === false &&
                        <Alert bsStyle='danger'>{UNEXPECTED_ERROR}</Alert>
                    }
                    {this.state.success &&
                        <Alert bsStyle='success'>{'Your bio has been updated!'}</Alert>
                    }
                    <FormGroup bsClass={newBioClass}>
                        <Label>New Bio</Label>
                        <textarea
                            name='newBio'
                            className='form-control'
                            placeholder='New bio'
                            value={this.state.newBio}
                            onChange={this.handleInputChange} />
                    </FormGroup>
                    <Button bsStyle='primary' type='submit'>Submit</Button>
                </form>
            </div>
        );
    }
}

export default BioSettings;
