import React, { Component } from 'react';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';


class EditPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.formID,
            userID: this.props.location.state.userID,
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: '',
            redirect: false,
            error: '',
            callQuery: false,
            numResponses: 10
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.renderTextareas = this.renderTextareas.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({ [name]: value });
    }

    async findForm() {
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        const apiData = await client.query({ query: gql(queries.getForm), variables: { id: this.props.location.state.formID } });
        if (apiData.data.getForm == null) {
            this.state.callQuery = true;
            (() => { this.handleError(); })();
        }
        else {
            this.setState({
                q1: apiData.data.getForm.q1,
                q2: apiData.data.getForm.q2,
                q3: apiData.data.getForm.q3,
                q4: apiData.data.getForm.q4,
                q5: apiData.data.getForm.q5,
                q6: apiData.data.getForm.q6,
                q7: apiData.data.getForm.q7,
                q8: apiData.data.getForm.q8,
                q9: apiData.data.getForm.q9,
                q10: apiData.data.getForm.q10,
                callQuery: true
            });
        }
    }

    handleTextArea(field) {
        this.setState({ [field]: document.getElementById(field).value });
    }

    renderTextareas() {
        let arr = [];
        for (var i = 1; i <= this.state.numResponses; i++) {
            console.log("iteration" + i);
            let question = 'q' + i;
            arr.push(<Textarea
                id={question}
                value={this.state[question]}
                name={'Question ' + i}
                placeholder={'Question ' + i}
                handleChange={() => this.handleTextArea(question)} />)
        }
        return arr;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        let nullVal = false;
        let elements = [this.state.q1,
        this.state.q2, this.state.q3,
        this.state.q4, this.state.q5,
        this.state.q6, this.state.q7,
        this.state.q8, this.state.q9, this.state.q10];
        for (var key in elements) {
            if (elements[key] == '') {
                nullVal = true;
                break;
            }
        }
        if (nullVal == true) {
            this.setState({ error: 'Uh-oh, make sure you have inputted all questions!' });
        } else {
            this.state.error = '';
            const createF = {
                id: this.state.id,
                formUserId: this.state.userID,
                userID: this.state.userID,
                q1: this.state.q1,
                q2: this.state.q2,
                q3: this.state.q3,
                q4: this.state.q4,
                q5: this.state.q5,
                q6: this.state.q6,
                q7: this.state.q7,
                q8: this.state.q8,
                q9: this.state.q9,
                q10: this.state.q10,
            }
            const client = new AWSAppSyncClient({
                url: awsconfig.aws_appsync_graphqlEndpoint,
                region: awsconfig.aws_appsync_region,
                disableOffline: true,
                auth: {
                    type: AUTH_TYPE.API_KEY,
                    apiKey: awsconfig.aws_appsync_apiKey,
                },
            });
            const newGame = await client.mutate({ mutation: gql(mutations.updateForm), variables: { input: createF } });
            this.setState({ redirect: true });
        }
    }

    render() {
        if (!this.state.callQuery) {
            (async () => { await this.findForm(); })();
        }

        if (this.state.redirect) {
            this.state.redirect = false;
            return <Redirect to={{
                pathname: "/adminConsole"
            }} />
        }
        return (
            <div>
                <h1> Edit Your Game: {this.state.id} </h1>
                <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                    {/* <Input inputType={'text'}
          title={'Name:'}
          name={'fname'}
          value={this.state.fname}
          placeholder={'First name'}
          handleChange={this.handleInput}

        />  */}
                    {this.renderTextareas()}

                    {/* <Input inputType={'text'}
                        title={'Question 1:'}
                        name={'q1'}
                        value={this.state.q1}
                        placeholder={'Question 1'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 2:'}
                        name={'q2'}
                        value={this.state.q2}
                        placeholder={'Question 2'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 3:'}
                        name={'q3'}
                        value={this.state.q3}
                        placeholder={'Question 3'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 4:'}
                        name={'q4'}
                        value={this.state.q4}
                        placeholder={'Question 4'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 5:'}
                        name={'q5'}
                        value={this.state.q5}
                        placeholder={'Question 5'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 6:'}
                        name={'q6'}
                        value={this.state.q6}
                        placeholder={'Question 6'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 7:'}
                        name={'q7'}
                        value={this.state.q7}
                        placeholder={'Question 7'}
                        handleChange={this.handleInput}

                    />

                    <Input inputType={'text'}
                        title={'Question 8:'}
                        name={'q8'}
                        value={this.state.q8}
                        placeholder={'Question 8'}
                        handleChange={this.handleInput}

                    /> 

                    <Input inputType={'text'}
                        title={'Question 9:'}
                        name={'q9'}
                        value={this.state.q9}
                        placeholder={'Question 9'}
                        handleChange={this.handleInput}

                    />

                    <Input inputType={'text'}
                        title={'Question 10:'}
                        name={'q10'}
                        value={this.state.q10}
                        placeholder={'Question 10'}
                        handleChange={this.handleInput}

                    />  */}

                    <Button
                        action={this.handleFormSubmit}
                        type={'primary'}
                        title={'Submit'}
                    /> { /*Submit */}

                </form>
                {this.state.error}
            </div>
        );
    }
}

export default EditPage;