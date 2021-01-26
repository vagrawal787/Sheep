import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
class MatchingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.formID,
            currentRound: "r1",
            words: [],
            input: '',
            returnWords: [],
            call: false,
            checks: [],
            loading: false,
            redirectToResponse: false,
        }
        this.getObjects = this.getObjects.bind(this);
        this.setCheckboxes = this.setCheckboxes.bind(this);
        this.handleStep1Submit = this.handleStep1Submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.generateRoundButtons = this.generateRoundButtons.bind(this);
        this.redirectToResponses = this.redirectToResponses.bind(this);
    }

    async getObjects() {
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
                query: gql(queries.getCloseResponses),
                variables: { formID: this.state.id, round: this.state.currentRound }
            });
            console.log("api data fetched");
            this.state.call = true;
            console.log(apiData);
        } catch (e) {
            console.log(e);
        }
        if (apiData == '' || apiData.data.getCloseResponses == null) {
        } else {
            let data = apiData.data.getCloseResponses.words;
            // var editData = data.replace(/=/g, ":");
            // data = editData.replace(/-/g, '"');
            this.setState({
                words: data,
            });
            (() => { this.setCheckboxes() })();
        }

    }

    handleCheck(e) {
        var key = e.target.name;
        const index = (this.state.returnWords).indexOf(key);
        if (e.target.checked == true) {
            if (index < 0) {
                (this.state.returnWords).push(key);
            }
        } else {
            if (index >= 0) {
                (this.state.returnWords).splice(index, 1);
            }
        }
        console.log(this.state.returnWords);

    }

    async handleStep1Submit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "formID": this.state.id.toString(),
            "round": this.state.currentRound,
            "words": ('"[' + this.state.returnWords + ']"'),
            "replaceWord": this.state.input
        });
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        await fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        var raw2 = JSON.stringify({ "formID": this.state.id.toString() });
        var requestOptions2 = {
            method: 'PUT',
            headers: myHeaders2,
            body: raw2,
            redirect: 'follow'
        };
        await fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions2).catch(error => console.log('error', error));
        await (async () => { this.getObjects(); })();
        this.setState({ loading: false });
        this.setState({ input: '' });
    }

    handleInput(e) {
        let value = e.target.value;
        this.setState({ input: value });
    }

    switchRound(e) {
        this.setState({
            currentRound: e.target.value,
            call: false
        })
    }

    generateRoundButtons() {
        var arr = [];
        for (var i = 1; i <= 10; i++) {
            arr.push(<Button
                action={(e) => this.switchRound(e)}
                disabled={this.state.loading}
                value={('r' + i)}
                type={'primary'}
                title={'Round ' + i}
            />)
        }
        return arr;
    }
    redirectToResponses(e) {
        e.preventDefault();
        this.setState({ redirectToResponse: true });
    }

    setCheckboxes() {
        let arr = [];
        let header = Object.keys((this.state.words));
        header.map((key, index) => {
            arr.push(<div><input type='checkbox' id={this.state.words[key]} name={this.state.words[key]} onClick={(e) => this.handleCheck(e)} />
                <label for={this.state.words[key]}> {this.state.words[key]} </label></div>);
        })
        this.setState({ checks: arr });
    }
    render() {
        if (!this.state.call) {
            (async () => { this.getObjects(); })();
        }
        if (this.state.redirectToResponse) {
            this.state.call = false;
            this.state.redirectToResponse = false;
            return <Redirect to={{
                pathname: "/responseManager",
                state: {
                    formID: this.state.id,
                    userID: this.props.location.state.userID,
                    status: this.props.location.state.status,
                }
            }} />
        }

        return (
            <div>
                {this.generateRoundButtons()}
                {this.state.currentRound}
                {this.state.checks}
                <Input inputType={'text'}
                    name={'input'}
                    value={this.state.input}
                    placeholder={'Word to Replace'}
                    handleChange={this.handleInput}

                />
                <Button
                    action={(e) => this.handleStep1Submit(e)}
                    type={'primary'}
                    title={'Submit'}
                /> { /*Submit */}
                <Button
                    action={this.redirectToResponses}
                    disabled={this.state.loading}
                    type={'primary'}
                    title={'Go back to Responses'}
                />

                {this.state.loading && <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />}
            </div>
        )
    }
}

export default MatchingPage;