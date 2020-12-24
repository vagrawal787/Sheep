import React, { Component } from 'react';
import Button from '../components/Button';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

import CreatePage from '../pages/formCreator';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


class ConsolePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            message: '',
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
            this.state.userID = Auth.currentUserInfo().attributes.sub;
            return <CreatePage userID={this.state.userID}/>
        }
        const mes = this.state.message;
        (()=>{this.setMessage();})();
        return (
            <div>
                <AmplifySignOut />
                <h1> Welcome to Admin Console! </h1>
                <h3> {mes} </h3>
                <Button
                    action={this.handleButtonPress}
                    type={'primary'}
                    title={'Create Game'}
                />
            </div>
        );
    }
}

export default withAuthenticator(ConsolePage);