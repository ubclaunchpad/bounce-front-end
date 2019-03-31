/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
    Alert,
    Badge,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Col,
    FormGroup,
    Glyphicon,
    Grid,
    Label,
    PageHeader,
    Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    CLUB_ALREADY_EXISTS,
    CLUB_UPDATED,
    INVALID_INFO,
    RESOURCE_NOT_FOUND,
    UNEXPECTED_ERROR,
} from '../../constants';
/* eslint-enable no-unused-vars */

class ViewClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            websiteUrl: '',
            facebookUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            memberships: [],
            isEditable: false,
            isEditing: false,
            msg: undefined,
            isSuccess: undefined,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.renderAsForm = this.renderAsForm.bind(this);
        this.renderAsUneditable = this.renderAsUneditable.bind(this);
    }

    /**
     * Fetches club info after the page has rendered.
     */
    componentDidMount() {
        // Fetch the club's info after rendering
        this.props.client.getClub(this.props.name)
            .then(response => {
                if (response.ok) {
                    response.json().then(body => {
                        this.setState({
                            name: body.name,
                            description: body.description,
                            websiteUrl: body.websiteUrl,
                            facebookUrl: body.facebookUrl,
                            instagramUrl: body.instagramUrl,
                            twitterUrl: body.twitterUrl,
                        });
                    });
                } else if (response.status === 404) {
                    this.setState({
                        msg: RESOURCE_NOT_FOUND,
                        isSuccess: false
                    });
                    return;
                } else {
                    this.setState({
                        msg: UNEXPECTED_ERROR,
                        isSuccess: false
                    });
                    return;
                }
            })
            .catch(() => {
                this.setState({
                    msg: UNEXPECTED_ERROR,
                    isSuccess: false
                });
                return;
            });

        this.props.client.getMemberships(this.props.name).then(response => {
            if (response.ok) {
                response.json().then(body => {
                    // Check if we're a president or admin of this club
                    const admin = body.find(member => {
                        return (member.username === this.props.user.username &&
                            ['President', 'Admin'].indexOf(member.role) !== -1);
                    });
                    this.setState({
                        isEditable: !!admin,
                        memberships: body,
                    });
                });
            } else if (response.status !== 404) {
                this.setState({
                    msg: UNEXPECTED_ERROR,
                    isSuccess: false
                });
            }
        }).catch(() => {
            this.setState({
                msg: UNEXPECTED_ERROR,
                isSuccess: false
            });
        });
    }

    /**
     * Handles the event that occurs when a user hits submit on the 'Edit Club'
     * form by attempting to update the club with the information provided.
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        this.props.client.updateClub(
            this.props.name,
            this.state.name,
            this.state.description,
            this.state.websiteUrl,
            this.state.facebookUrl,
            this.state.instagramUrl,
            this.state.twitterUrl
        ).then(response => {
            if (response.ok) {
                // Display success message
                this.setState({
                    msg: CLUB_UPDATED,
                    isSuccess: true
                });
            } else if (response.status === 409) {
                // A club with that name already exists
                this.setState({
                    msg: CLUB_ALREADY_EXISTS,
                    isSuccess: false
                });
            } else if (response.status === 400) {
                // Some of the information entered is invalid
                this.setState({
                    msg: INVALID_INFO,
                    isSuccess: false,
                });
            } else {
                // An unexpected error occurred
                this.setState({
                    msg: UNEXPECTED_ERROR,
                    isSuccess: false
                });
            }
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

    /**
     * Returns HTML elements displaying the club's info as a form.
     */
    renderAsForm() {
        return (
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
                    <textarea type='text'
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

                <Button bsStyle='primary'
                    onClick={this.handleSubmit}>
                    Save
                </Button>
            </form>
        );
    }

    /**
     * Returns HTML elements containing the club's info.
     */
    renderAsUneditable() {
        let websiteUrl, facebookUrl, instagramUrl, twitterUrl;
        if (this.state.websiteUrl) {
            websiteUrl = <a href={this.state.websiteUrl}>Website</a>;
        }
        if (this.state.facebookUrl) {
            websiteUrl = <a href={this.state.facebookUrl}>Facebook</a>;
        }
        if (this.state.instagramUrl) {
            websiteUrl = <a href={this.state.instagramUrl}>Instagram</a>;
        }
        if (this.state.twitterUrl) {
            websiteUrl = <a href={this.state.twitterUrl}>Twitter</a>;
        }
        return <Col>
            <div className='container'>
                <p>{this.state.description}</p>
                {websiteUrl}
                {facebookUrl}
                {instagramUrl}
                {twitterUrl}
            </div>
        </Col>;
    }

    render() {
        // Create member list
        let members = this.state.memberships.map(membership => {
            return (
                <div>
                    <Link to='/'
                        key={membership.user_id}
                        className='card-title'>
                        {membership.full_name}
                        &nbsp;
                        {['President', 'Admin'].indexOf(membership.role) !== -1 &&
                            `(${membership.role})`}
                    </Link>
                    <br/>
                </div>
            );
        });

        // Check if the current user can edit the club
        let clubContent;
        if (this.state.isEditing) {
            // Show club as editable form
            clubContent = this.renderAsForm();
        } else {
            // Show normal club view
            clubContent = this.renderAsUneditable();
        }

        // Get info/error messages
        let msg;
        if (this.state.msg) {
            const type = this.state.isSuccess ? 'success' : 'warning';
            msg = <Alert bsStyle={type}> {this.state.msg} </Alert>;
        }

        // Display an edit button if the current user can edit the club
        let editButton, cancelButton;
        if (this.state.isEditable) {
            if (this.state.isEditing) {
                cancelButton = (
                    <Button
                        onClick={() => this.setState({ isEditing: false })}>
                        <Glyphicon glyph='remove' />
                    </Button>
                );
            } else {
                editButton = (
                    <Button
                        onClick={() => this.setState({ isEditing: true })}>
                        <Glyphicon glyph='pencil' />
                    </Button>
                );
            }
        }

        return (
            <div className='container page'>
                <PageHeader>
                    {this.props.name || this.state.name}
                </PageHeader>

                {msg}

                <ButtonToolbar>
                    <ButtonGroup>
                        {editButton}
                        {cancelButton}
                    </ButtonGroup>
                </ButtonToolbar>

                {clubContent}

                <Grid className='container left'>
                    <Row className='show-grid'>
                        <h3>
                            Members <Badge>{members.length}</Badge>
                        </h3>
                    </Row>
                    <Row className='show-grid'>
                        {members}
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        user: store.userReducer.user
    };
};

export default connect(mapStoreToProps)(ViewClub);
