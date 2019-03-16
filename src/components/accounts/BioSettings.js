/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Button, Label, FormGroup } from 'react-bootstrap';

import '../../css/Settings.css';
/* eslint-enable no-unused-vars */

class BioSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBio: '',
            newBio: '',
            BioChangeMessage: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
        //this.handleBioChangeSubmit = this.handleBioChangeSubmit.bind(this);

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

    /**
     * Update user bio and return whether process was successful
     */
    updateBio() {
        // Stub
        return true;
    }


    /**
     * Update user bio.
     * @param {Event} event
     
    
    handleBioChangeSubmit(event) {
        event.preventDefault();

        this.updateBio()
            .then(isUpdated => {
                this.setState({ failed: !isUpdated }); 
        }); 
    } */

    render() {
        let newBioClass; 
        return (
            <div>
                <form onSubmit={this.handleBioChangeSubmit}>
                    <FormGroup bsClass={newBioClass}>
                        <Label>New Bio</Label>
                        <textarea type='bio'
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
