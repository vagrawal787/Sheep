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
            buttons: [],
            rendering: false,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.getUserID = this.getUserID.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.setButtons = this.setButtons.bind(this);
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
        this.setState({ userID: user.username });
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        console.log("fetching api data");
        let apiData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getUsers),
                variables: { id: this.state.userID }
            });
            console.log("api data fetched");
            console.log(apiData);
        } catch (e) {
            console.log(e);
        }
        if (apiData == '' || apiData.data.getUsers == null) {
            try {
                const mutData = await client.mutate({
                    mutation: gql(mutations.createUsers),
                    variables: { input: { id: this.state.userID } }
                });
            } catch (e) {
                console.log(e);
            }
            console.log('normal retrieval');
        } else {
            var dict = apiData.data.getUsers.forms.items;
            var arr = [];
            for (var key in dict) {
                arr.push((dict[key]).id);
            }
            this.state.forms = arr;
            console.log(this.state.forms);
        }
        (() => {this.setButtons();})();
        this.setState({ apicall: true });
    }

    setButtons() {
        var arr = [];
        for (var p in this.state.forms) {
            var button = <Button
                action={this.handleButtonPress}
                type={'primary'}
                label = {p}
                title={"form buttons"}
            />
            arr.push(button);
        }
        this.state.rendering = true;
        console.log(arr);
        this.setState({buttons: arr});
    }

    refreshState() {
        this.setState({ refresh: false });
    }
    render() {
        if (this.props.refresh == true) {
            (() => { this.refreshState(); })();
        }
        if (!this.state.call) {
            console.log("calling admin api");
            (async () => { this.getUserID(); })();
        }
        // if (!this.state.rendering){
        //     (() => { this.setButtons(); })();
        // }
        if (this.state.redirect) {
            this.state.redirect = false;
            this.state.refresh = false;
            this.state.call = false;
            this.state.apicall = false;
            this.state.rendering = false;
            console.log("redirecting from admin");
            return <CreatePage userID={this.state.userID} />
        }
        return (
            <div>
                <AmplifySignOut />
                <h1> Welcome to Admin Console! </h1>
                {this.state.buttons}
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