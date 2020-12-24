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
            call: false,
            refresh: this.props.refresh,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.getUserID = this.getUserID.bind(this);
        this.refreshState = this.refreshState.bind(this);
    }

    handleButtonPress(e) {
        e.preventDefault();
        this.setState({ redirect: true });
    }


    setMessage() {
        this.state.message = '';
    }

    async getUserID() {
        const user = await Auth.currentUserInfo().username;
        console.log(user);
        this.state.call = true;
        this.state.userID = user;
    }
    refreshState(){
        this.setState({refresh: false});
    }
    render() {
        if(this.state.refresh){
            (() => {this.refreshState();})();
        }
        if(!this.state.call){
            (async () => {this.getUserID();})();
        }
        if (this.state.redirect) {
            this.state.redirect = false;
            this.state.refresh = false;
            this.state.call = false;
            return <CreatePage userID={this.state.userID}/>
        }
        (()=>{this.setMessage();})();
        return (
            <div>
                <AmplifySignOut />
                <h1> Welcome to Admin Console! </h1>
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