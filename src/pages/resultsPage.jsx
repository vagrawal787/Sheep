import React, { Component } from 'react';
import LandingFormContainer from '../containers/LandingFormContainer';
import "./CSS/resultspage.css"

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
            winners: [{fname: '', lname: '', r10_sum: 0}, {fname: '', lname: '', r10_sum: 0}, {fname: '', lname: '', r10_sum: 0}],
        }
        this.handleSort = this.handleSort.bind(this);
        this.compareByKey = this.compareByKey.bind(this);
        this.fetchWinners = this.fetchWinners.bind(this);
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
        try {
            apiData = await client.query({
                query: gql(queries.getFormResponseList),
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
            let copyResponses = apiData.data.getFormResponseList.forms.items;
            copyResponses.sort(this.compareByKey('r10_sum'));
            this.setState({
                winners: copyResponses.slice(0, 3),
            });
        }
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

        render() {
            if(!this.state.call){
                (async () => {this.fetchWinners();})();
            }
            return (
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
            );
        }
    }

    export default ResultsPage;