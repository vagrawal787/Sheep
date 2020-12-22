import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import formId from "../pages/landingForm.jsx";

import {API} from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';

import { withAuthenticator } from '@aws-amplify/ui-react'
import * as queries from '../graphql/queries';

class MainPage extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            string: '',
        }
    }

    async findForm() {
      console.log("hi");
      const client = new AWSAppSyncClient({
        url: awsconfig.aws_appsync_graphqlEndpoint,
        region: awsconfig.aws_appsync_region,
        auth: {
          type: AUTH_TYPE.API_KEY,
          apiKey: awsconfig.aws_appsync_apiKey,
        },
      });
        console.log("hello");
        const apiData = await client.graphql({query: queries.getForm, variables: { id: 123 }});
        this.setState({string: apiData.data.getForm.name});
    }


    render() {
      (async () => { await this.findForm();})();
      return (
        <div>
          {this.state.string}
        </div>
      );
    }
  }
  
  export default MainPage;