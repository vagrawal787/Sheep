import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

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
        }
        this.getObjects = this.getObjects.bind(this);
        this.setCheckboxes = this.setCheckboxes.bind(this);
        this.handleStep1Submit = this.handleStep1Submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.generateRoundButtons = this.generateRoundButtons.bind(this);
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
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var raw = JSON.stringify({
        //     "formID": this.state.id,
        //     "round": this.state.currentRound,
        //     "words": this.state.returnWords,
        //     "replaceWord": this.state.input        
        // });
        // var requestOptions = {
        //     method: 'PUT',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        // fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
    }

    handleInput(e) {
        let value = e.target.value;
        this.setState({ code: value });
    }

    switchRound(e){
        this.setState({currentRound: e.target.value,
        call: false})
    }

    generateRoundButtons(){
        var arr = [];
        for (var i = 1; i <= 10; i ++){
            arr.push(<Button
                action={(e) => this.switchRound(e)}
                value = {('r' + i)}
                type={'primary'}
                title={'Round ' + i}
            /> )
        }
        return arr;
    }

    setCheckboxes() {
        let arr = [];
        let header = Object.keys((this.state.words));
        header.map((key, index) => {
            arr.push(<div><input type='checkbox' id={key} name={this.state.words[key]} onClick={(e) => this.handleCheck(e)} />
                <label for={this.state.words[key]}> {this.state.words[key]} </label></div>);
        })
        this.setState({ checks: arr });
    }
    render() {
        if (!this.state.call) {
            (async () => { this.getObjects(); })();
        }

        return (
            <div>
                {this.generateRoundButtons()}
                {this.state.currentRound}
                {this.state.checks}
                <p> this is the matching page</p>
                <Input inputType={'text'}
                    name={'input'}
                    value={this.state.code}
                    placeholder={'Word to Replace'}
                    handleChange={this.handleInput}

                /> {/* Code */}
                <Button
                    action={(e) => this.handleStep1Submit(e)}
                    type={'primary'}
                    title={'Submit'}
                /> { /*Submit */}
            </div>
        )
    }
}

export default MatchingPage;