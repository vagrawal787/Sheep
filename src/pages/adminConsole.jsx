import React, { Component } from 'react';
import Button from '../components/Button';

import CreatePage from '../pages/formCreator';

class ConsolePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: Auth.currentUserInfo(),
            message: this.props.message,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    handleButtonPress(e) {
        e.preventDefault();
        this.setState({ redirect: true });
    }

    setMessage() {
        this.state.message = '';
    }

    render() {
        if (this.state.redirect) {
            this.state.redirect = false;
            return <CreatePage />
        }
        const mes = this.state.message;
        (()=>{this.setMessage();})();
        return (
            <div>
                <h1> Welcome to Admin Console! </h1>
                <h3> {mes} </h3>
                <Button
                    action={this.handleButtonPress}
                    type={'primary'}
                    title={'Submit'}
                />
            </div>
        );
    }
}

export default ConsolePage;