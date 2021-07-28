import React, { Component } from 'react';
import '../App.css';
import { Helmet } from "react-helmet";
// import background from '../images/sheepbackimage.jpg'

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

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
      hidden1: false,
      hidden2: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAdminButton = this.handleAdminButton.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleInput(e) {
    let value = e.target.value;
    let valueWidth = value.length;
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
      this.state.redirectSubmit = false;
      return <Redirect to={{
        pathname: "/userForm",
        state: { code: this.state.code, error: false }
      }} />
    }

    // if (this.state.redirectAdmin) {
    //   console.log("call admin");
    //   this.state.redirectAdmin = false;
    //   return <Redirect to={{ pathname: "/adminConsole" }} />
    // }

    if (this.state.redirectResults) {
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
        <div className = "adminPassword">
          {this.state.redirectAdmin && <Password />}
        </div>
        <p className = "disclaimer"> Note: Please don't use the browser controls (refresh/back)! We're working on a bug :) </p>
        {/* <button className="hidden1" onClick={() => this.setState({hidden1: true})}></button>
        <button className="hidden2" disabled= {!this.state.hidden1} onClick={() => this.setState({hidden2: true})}></button> */}
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
          <div className="credit">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

        </div>
      </div>


    );
  }
}

class Notification extends React.Component {
  render() {
    return <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have inputted a valid code! </span>
  }
}

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      redirect: false
    }
    this.inputHandler = this.inputHandler.bind(this);
  }


  inputHandler(e) {
    let value = e.target.value;
    this.setState({ password: value });
    if (this.state.password == 'bamboozle') {
      this.setState({ redirect: true });
    }
  }
  render() {
    if (this.state.redirect) {
      this.state.redirectAdmin = false;
      return <Redirect to={{ pathname: "/adminConsole" }} />
    }
    return (<Input inputType={'text'}
      name={'password'}
      value={this.state.password}
      placeholder={'Enter the password'}
      handleChange={this.inputHandler}
    />
    )
  }
}

export default withRouter(LandingFormContainer);