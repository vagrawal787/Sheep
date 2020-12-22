import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import formId from "../pages/landingForm.jsx";

import {API} from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

class MainPage extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            questions: {q1:'', q2:'', q3:'', q4: '', q5:'', q6:'', q7:'', q8:'', q9:'', q10:''},
        }
    }

    async findForm() {
      console.log("hi");
      const normalizeData = repos => repos.map(repo => ({
        q1: repo.html_url,
        name: repo.name,
        owner: repo.owner.login,
        description: repo.description,
        stars: repo.stargazers_count
      }));
      const client = new AWSAppSyncClient({
        url: awsconfig.aws_appsync_graphqlEndpoint,
        region: awsconfig.aws_appsync_region,
        auth: {
          type: AUTH_TYPE.API_KEY,
          apiKey: awsconfig.aws_appsync_apiKey,
        },
      });
        console.log("hello");
        const apiData = await client.query({query: gql(queries.getForm), variables: { id: 123 }});
        for (var key in apiData){
          this.state.questions.key = apiData.data.getForm[key];
        }
        //this.setState({string: apiData.data.getForm});
    }


    render() {
      (async () => { await this.findForm();})();
      return (
        <div>
          {this.state.questions.q1}
        </div>
      );
    }
  }
  
  export default MainPage;