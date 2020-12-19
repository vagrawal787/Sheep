import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import formId from "../pages/landingForm.jsx";

import {API} from 'aws-amplify';
import * as queries from '../graphql/queries';

class MainPage extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            string: '',
        }
    }

    async findForm() {
        console.log("hello");
        const apiData = await API.graphql({query: queries.getForm, variables: { id: 123 } });
        this.setState({string: apiData.data.getForm.name});
    }

    render() {
      return (
        <div>
          {this.state.string}
          </div>
      );
    }
  }
  
  export default MainPage;