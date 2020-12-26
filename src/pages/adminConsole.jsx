import React, { Component } from 'react';
import Button from '../components/Button';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

import { API } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import gql from 'graphql-tag';

import CreatePage from '../pages/formCreator';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


class ConsolePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            message: '',
            call: false,
            refresh: this.props.refresh,
            redirect: false,
            apicall: false,
            forms: [],
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
        const user = await Auth.currentUserInfo();
        console.log(user.username);
        this.state.call = true;
        this.setState({userID: user.username});
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
              type: AUTH_TYPE.API_KEY,
              apiKey: awsconfig.aws_appsync_apiKey,
            },
          });
          const apiData = await client.query({ query: gql(queries.getUsers), variables: { id: this.state.userID} });
          if(apiData.data.getForm == null){
              const mutData = await client.mutate({mutation: gql(mutations.createUsers), variables: {input: {id: this.state.userID, userID: this.state.userID}}});
              console.log('normal retrieval')
          } else {
              this.state.forms = JSON.parse(apiData.data.getForm.forms.items)
              console.log(this.state.forms);
          }
          this.setState({apicall: true});
    }

    // async getApiData() {

    // }
    refreshState(){
        this.setState({refresh: false});
    }
    render() {
        if(this.props.refresh == true){
            (() => {this.refreshState();})();
        }
        if(!this.state.call){
            (async () => {this.getUserID();})();
            
        }
        // if (!this.state.apicall){
        //     (async () => {this.getApiData();})();
        // }
        if (this.state.redirect) {
            this.state.redirect = false;
            this.state.refresh = false;
            this.state.call = false;
            this.state.apicall = false;
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