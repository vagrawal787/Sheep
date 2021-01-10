import React, { Component } from 'react';
import '../App.css';
import { Helmet } from "react-helmet";
// import background from '../images/sheepbackimage.jpg'

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

class LandingFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      redirectSubmit: false,
      redirectAdmin: false,
      redirectResults: false,
      errorMessage: '',
      show: false,

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAdminButton = this.handleAdminButton.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleInput(e) {
    let value = e.target.value;
    this.setState({ code: value });
  }

  showNotification() {
    // You can use redux for this.
    this.setState({
      show: true,
    });
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 2000);
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const client = new AWSAppSyncClient({
      url: awsconfig.aws_appsync_graphqlEndpoint,
      region: awsconfig.aws_appsync_region,
      disableOffline: true,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsconfig.aws_appsync_apiKey,
      },
    });
    try {
      const apiData = await client.query({ query: gql(queries.getForm), variables: { id: this.state.code } });
      const open = apiData.data.getForm.active;
      if (apiData.data.getForm == null) {
        (() => { this.showNotification() })();
      } else if (open) {
        this.setState({ redirectSubmit: true });
      } else {
        this.setState({ redirectResults: true });
      }
    } catch (e) {
      console.log(e);
      (() => { this.showNotification() })();
    }
  }
  handleAdminButton(e) {
    e.preventDefault();
    this.setState({ redirectAdmin: true });
  }

  render() {
    try {
      if (this.props.location.state.show) {
        (() => { this.showNotification() })();
      }
    } catch{
      console.log('no show');
    }
    if (this.state.redirectSubmit) {
      console.log("call mainpage");
      console.log(this.state.code)
      this.state.redirectSubmit = false;
      return <Redirect to={{
        pathname: "/userForm",
        state: { code: this.state.code, error: false }
      }} />
    }

    if (this.state.redirectAdmin) {
      console.log("call admin");
      this.state.redirectAdmin = false;
      return <Redirect to={{ pathname: "/adminConsole" }} />
    }

    if (this.state.redirectResults) {
      console.log("call results");
      this.state.redirectResults = false;
      return <Redirect to={{
        pathname: "/resultsPage",
        state: { code: this.state.code }
      }} />
    }
    return (
      <div className="container">
        <Helmet>
          <link rel="stylesheet" href="landing.css" />
          {/* <style>{'body { background-image: url(${background}); }'}</style> */}
        </Helmet>
        <div className="adminButton">
          <Button
            action={this.handleAdminButton}
            type={'primary'}
            title={'Go To Admin'}
          /> { /* Admin */}
        </div>
        <div className="landingCont">
          <div className="child">
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>

              <p className="codeParagraph"> Game Code: </p>
              <Input inputType={'text'}
                name={'code'}
                value={this.state.code}
                placeholder={'Enter your code'}
                handleChange={this.handleInput}

              /> {/* Code */}
              <div className="subButton">
                <Button
                  action={this.handleFormSubmit}
                  type={'primary'}
                  title={'Submit'}
                /> { /*Submit */}

              </div>
            </form>
          </div>
          <div className='notif'>
            <Notification show={this.state.show} />
          </div>

        </div>
      </div>


    );
  }
}

class Notification extends React.Component {
  render() {
    return <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have inputted a valid code! </span>
  } v
}

export default LandingFormContainer;