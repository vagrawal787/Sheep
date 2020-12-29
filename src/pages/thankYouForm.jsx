import React, { Component } from 'react';
import Button from '../components/Button';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

class ThankFormCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleButtonPress(e) {
        e.preventDefault();
        console.log("button pressed");
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            this.state.redirect = false;
            return <Redirect to={{
                pathname: "/adminConsole",
                state: { refresh: true }
            }} />
        }
        return (
            <div>
                <h1>
                    Thanks for creating a form! Be sure to send this code to your players: {this.props.location.state.code}
                </h1>
                <Button
                    action={this.handleButtonPress}
                    type={'primary'}
                    title={'Return to Admin Console'}
                />
            </div>
        );
    }
}

export default ThankFormCreate;