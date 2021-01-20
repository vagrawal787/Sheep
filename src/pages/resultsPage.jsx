import React, { Component } from 'react';
import LandingFormContainer from '../containers/LandingFormContainer';
import "./CSS/resultspage.css"

import Input from '../components/Input';
import Button from '../components/Button';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class ResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.code,
            call: false,
            email: '',
            winners: [{ fname: '', lname: '', r10_sum: 0 }, { fname: '', lname: '', r10_sum: 0 }, { fname: '', lname: '', r10_sum: 0 }],
            userIndex: 0,
            responses: [{ email: '' }],
            formData: { q1: '' },
            userResponses: { r1: '' },
            results: false,
            show: false,
        }
        this.handleSort = this.handleSort.bind(this);
        this.compareByKey = this.compareByKey.bind(this);
        this.fetchWinners = this.fetchWinners.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.showUserResults = this.showUserResults.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.createDivs = this.createDivs.bind(this);
        this.showDiv = this.showDiv.bind(this);
    }

    async fetchWinners() {
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
        let formData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getFormResponseList),
                variables: { id: this.state.id }
            });
            formData = await client.query({
                query: gql(queries.getForm),
                variables: { id: this.state.id }
            });
            console.log(apiData);
            console.log("results fetched");
            this.state.call = true;
        } catch (e) {
            console.log(e);
        }
        if (apiData == '' || apiData.data.getFormResponseList == null) {
            try {
                const mutData = await client.mutate({
                    mutation: gql(mutations.createFormResponseList),
                    variables: { input: { id: this.state.id } }
                });
                this.state.call = true;
            } catch (e) {
                console.log(e);
            }
        } else {
            let responses = apiData.data.getFormResponseList.forms.items;
            let copyResponses = responses;
            copyResponses.sort(this.compareByKey('r10_sum'));
            this.setState({
                formData: formData.data.getForm,
                results: formData.data.getForm.results,
                responses: responses,
                winners: copyResponses.slice(0, 3),
            });
        }
    }

    showNotification() {
        this.setState({
            show: true,
        });
        setTimeout(() => {
            this.setState({
                show: false,
            });
        }, 2000);
    }

    handleSort(key) {
        let copyResponses = [...this.state.responses];
        copyResponses.sort(this.compareByKey(key));
        this.setState({ responses: copyResponses });
    }

    compareByKey(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
            if (a[key] > b[key]) return 1;  //check for value if the second value is bigger then first return 1
            return 0;
        }
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({ [name]: value });
    }

    async handleSubmitEmail(e) {
        e.preventDefault();
        let nullVal = false;
        if (this.state.email == '') {
            (() => { this.showNotification() })();
        } else {
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
                    query: gql(queries.getResponseCleaned),
                    variables: { formID: this.state.id, email: this.state.email }
                });
                console.log(apiData.data.getResponseCleaned);
            } catch (e) {
                console.log(e);
            }
            if (apiData == '' || apiData.data.getResponseCleaned == null) {
                (() => { this.showNotification(); })();
            } else {
                let responses = this.state.responses;
                for (var index in responses) {
                    if (responses[index].email == this.state.email) {
                        this.setState({
                            userResponses: apiData.data.getResponseCleaned,
                            userIndex: index
                        });
                        (() => { this.showDiv() })();
                        break;
                    }
                }
            }
        }
    }

    
    createDivs(question, response, points) {
        const user = this.state.responses[this.state.userIndex];
        const userResponses = this.state.userResponses;
        const formData = this.state.formData;
        console.log(userResponses);
        const fname = user.fname;
        const lname = user.lname;
        const totPoints = user.r10_sum;
        var obj = { id: 'variables' }
        obj.p1 = user.r1;
        obj.p2 = user.r2;
        obj.p3 = user.r3;
        obj.p4 = user.r4;
        obj.p5 = user.r5;
        obj.p6 = user.r6;
        obj.p7 = user.r7;
        obj.p8 = user.r8;
        obj.p9 = user.r9;
        obj.p10 = user.r10;
        obj.r1 = userResponses.r1;
        obj.r2 = userResponses.r2;
        obj.r3 = userResponses.r3;
        obj.r4 = userResponses.r4;
        obj.r5 = userResponses.r5;
        obj.r6 = userResponses.r6;
        obj.r7 = userResponses.r7;
        obj.r8 = userResponses.r8;
        obj.r9 = userResponses.r9;
        obj.r10 = userResponses.r10;
        obj.q1 = formData.q1;
        obj.q2 = formData.q2;
        obj.q3 = formData.q3;
        obj.q4 = formData.q4;
        obj.q5 = formData.q5;
        obj.q6 = formData.q6;
        obj.q7 = formData.q7;
        obj.q8 = formData.q8;
        obj.q9 = formData.q9;
        obj.q10 = formData.q10;
        return (
            <div className='result-container'>
                <div className="question">
                    {obj[question]}
                </div>
                <div className="response">
                    {obj[response]}
                </div>
                <div className="points">
                    {obj[points]}
                </div>
            </div>
        )
    }
    showDiv() {
        document.getElementById("final-result").style.display = "block";
    }

    showUserResults() {
        const user = this.state.responses[this.state.userIndex];
        const userResponses = this.state.userResponses;
        const formData = this.state.formData;
        console.log(userResponses);
        const fname = user.fname;
        const lname = user.lname;
        const totPoints = user.r10_sum;
        var arr = [];
        for (var i = 1; i <= 10; i++) {
            arr.push(this.createDivs(('q' + i), ('r' + i), ('p' + i)));
        };
        return (
            <div id="final-result">

                <div className="userName">
                    {fname} {lname}
                </div>
                <div className="totPoints">
                    {totPoints}
                    <p id="numPoints"> points</p>
                </div>
                <div className='result-container2'>
                    <div className="question">
                        Question:
                    </div>
                    <div className="response">
                        Your Response:
                    </div>
                    <div className="points">
                        Points Earned:
                    </div>
                </div>
                {arr}
            </div>

        )
    }


    render() {
        if (!this.state.call) {
            (async () => { this.fetchWinners(); })();
        }
        if (this.state.results) {
            return (
                <div className="resultsPage">
                    <div className = "resultspage-container">
                    <div id="podium-box" className="row">
                        <div className="col-md-4 step-container m-0 p-0">
                            <div>
                                {this.state.winners[1].fname} {this.state.winners[1].lname}
                            </div>
                            <div id="second-step" className="bg-blue step centerBoth podium-number">
                                {this.state.winners[1].r10_sum} points
                     </div>
                        </div>
                        <div className="col-md-4 step-container m-0 p-0">
                            <div>
                                {this.state.winners[0].fname} {this.state.winners[0].lname}
                            </div>
                            <div id="first-step" className="bg-blue step centerBoth podium-number">
                                {this.state.winners[0].r10_sum} points
                    </div>
                        </div>
                        <div className="col-md-4 step-container m-0 p-0">
                            <div>
                                {this.state.winners[2].fname} {this.state.winners[2].lname}
                            </div>
                            <div id="third-step" className="bg-blue step centerBoth podium-number">
                                {this.state.winners[2].r10_sum} points
                    </div>
                        </div>
                    </div>
                    <div className="nameButton">
                        <Input inputType={'text'}
                            title={'Your email:'}
                            name={'email'}
                            style={{ margin: 10 }}
                            value={this.state.email}
                            placeholder={'Email'}
                            handleChange={this.handleInput}

                        /> {/* First name */}
                        <Button
                            action={this.handleSubmitEmail}
                            type={'primary'}
                            title={'Submit'}
                        /> { /*Submit */}
                    </div>
                    <Notification show={this.state.show} />
                    {this.showUserResults()}
                    </div>
                </div>
            );
        } else {
            return <p> The results for this form are not available yet. Please check back later!</p>
        }
    }
}

class Notification extends React.Component {
    render() {
        return <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have entered a valid email! </span>
    }
}

export default ResultsPage;