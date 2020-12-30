import React, { Component } from 'react';
import Button from '../components/Button';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class ResponseManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.formID,
            redirectToEdit: false,
        }
        this.handleEditFormButton = this.handleEditFormButton.bind(this);
    }

    handleEditFormButton(e) {
        e.preventDefault();
        this.setState({ redirectToEdit: true });
    }

    render() {
        if (this.state.redirectToEdit) {
            this.state.redirectToEdit = false;
            return <Redirect to={{
                pathname: "/formEditor",
                state: {
                    formID: this.state.id,
                    userID: this.props.location.state.userID
                }
            }} />
        }
        return (
            <div>
                <h1>
                    Responses for form: {this.props.location.state.formID}
                </h1>
                <Button
                    action={this.handleEditFormButton}
                    type={'primary'}
                    title={'Edit Form'}
                /> { /*Submit */}
            </div>
        );
    }
}

export default ResponseManager;