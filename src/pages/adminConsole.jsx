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

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';


class ConsolePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            message: '',
            call: false,
            redirect: false,
            apicall: false,
            forms: [],
            status: [],
            buttons: [],
            sent: [],
            rendering: false,
            redirectToManager: false,
            formToRedirect: '',
            statusToRedirect: false,
            sentToRedirect: false,
            redirectToHome: false,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleManagerPress = this.handleManagerPress.bind(this);
        this.getUserID = this.getUserID.bind(this);
        this.setButtons = this.setButtons.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    handleButtonPress(e) {
        e.preventDefault();
        this.setState({ redirect: true });
    }

    handleManagerPress(e) {
        e.preventDefault();
        let name = e.target.name;
        let status = e.target.value;
        this.state.formToRedirect = name;
        this.state.statusToRedirect = (status == 'true');
        this.setState({ redirectToManager: true });
    }

    /* Retrieves the current userID. 
    Fetches their forms from the API. 
    Calls function to change button state so that user can select which of their forms to manage.*/
    async getUserID() {
        const user = await Auth.currentUserInfo();
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
        let apiData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getUsers),
                variables: { id: this.state.userID }
            });
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
        } else {
            var dict = apiData.data.getUsers.forms.items;
            var arr = [];
            var statusArr = [];
            var sentArr = [];
            for (var key in dict) {
                arr.push((dict[key]).id);
                statusArr.push((dict[key]).active);
                sentArr.push((dict[key]).results);
            }
            this.state.forms = arr;
            this.state.status = statusArr;
            this.state.sent = sentArr;
        }
        let responseData = '';
        try {
            for (var p in this.state.forms){
                responseData = await client.query({
                    query: gql(queries.getFormResponseList),
                    variables: { id: this.state.forms[p] }
                });

            }

        } catch (e) {
            console.log(e);
        }

        (() => { this.setButtons(); })();
    }
    

    redirectToHome(e) {
        e.preventDefault();
        this.setState({
            redirect: false,
            call: false,
            redirectToManager: false,
            redirectToHome: true,
        });
    }

    setButtons() {
        var arr = [];
        for (var p in this.state.forms) {
            var button = <Button
                action={this.handleManagerPress}
                value={this.state.status[p]}
                type={'primary'}
                label={this.state.forms[p]}
                title={this.state.forms[p]}
            />
            arr.push(button);
        }
        this.setState({ buttons: arr });
    }

    createDivs() {
        var arr = [];
        for (var p in this.state.forms) {
            var returnDiv =
            <div className = "formSummary">
                var button = <Button
                action={this.handleManagerPress}
                value={this.state.status[p]}
                type={'primary'}
                label={this.state.forms[p]}
                title={this.state.forms[p]}
            />
            </div>
        }
    }

    render() {
        if (!this.state.call) {
            (async () => { this.getUserID(); })();
        }
        // if (!this.state.rendering){
        //     (() => { this.setButtons(); })();
        // }
        if (this.state.redirect) {
            this.state.redirect = false;
            this.state.call = false;
            this.state.redirectToManager = false;
            return <Redirect to={{
                pathname: "/createForm",
                state: { userID: this.state.userID }
            }} />
        }
        if (this.state.redirectToHome) {
            this.state.redirectToHome = false;
            return <Redirect to={{
                pathname: "/",
            }} />
        }
        if (this.state.redirectToManager) {
            this.state.redirect = false;
            this.state.call = false;
            this.state.redirectToManager = false;
            return <Redirect to={{
                pathname: "/responseManager",
                state: {
                    formID: this.state.formToRedirect,
                    userID: this.state.userID,
                    status: this.state.statusToRedirect,
                }
            }} />
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
                <Button
                    action={this.redirectToHome}
                    type={'primary'}
                    title={'Go back to Home Page'}
                />
            </div>
        );
    }
}

export default withAuthenticator(ConsolePage);