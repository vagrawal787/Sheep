import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import "./CSS/userform.css"

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
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
      r1: '',
      r2: '',
      r3: '',
      r4: '',
      r5: '',
      r6: '',
      r7: '',
      r8: '',
      r9: '',
      r10: '',
      redirect: false,
      error: false,
      errorMessage: '',
      call: false,
      show: false,
      matchingEmail: false,
      numResponses: 10,
      redirectHome: false,
      instructions: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleError = this.handleError.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.renderTextareas = this.renderTextareas.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    // this.setMessage = this.setMessage.bind(this);
  }

  componentDidUpdate(){
    console.log(this.props.history);
    window.onpopstate = this.backButtonEvent;
  }

  backButtonEvent(e){
    e.preventDefault();
    console.log("backbuttonpressed");
    this.goBack();
  }

  showNotification(name) {
    this.setState({
      [name]: true,
    });
    setTimeout(() => {
      this.setState({
        [name]: false,
      });
    }, 2000);
  }

  async findForm() {
    console.log("hi");

    const client = new AWSAppSyncClient({
      url: awsconfig.aws_appsync_graphqlEndpoint,
      region: awsconfig.aws_appsync_region,
      disableOffline: true,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsconfig.aws_appsync_apiKey,
      },
    });
    const apiData = await client.query({ query: gql(queries.getForm), variables: { id: this.props.location.state.code } });
    if (apiData.data.getForm == null) {
      this.state.call = true;
      (() => { this.handleError(); })();
    }
    else {
      this.state.call = true;
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
        q10: apiData.data.getForm.q10
      });
    }
  }

  handleInstructions(e) {
    e.preventDefault();
    this.setState({ instructions: !this.state.instructions });
    if (!this.state.instructions) {
      document.getElementById('container-fluid').style.opacity = "0";
    } else {
      document.getElementById('container-fluid').style.opacity = '1';
    }
  }


  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
    if (e.target.name == 'email') {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(this.state.email)) {
        this.setState({ invalidateEmail: true });
      } else {
        this.setState({ invalidateEmail: false });
      }
    }
  }

  handleTextArea(field) {
    this.setState({ [field]: document.getElementById(field).value });
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    let nullVal = false;
    let elements = [this.state.fname, this.state.lname,
    this.state.email, this.state.id,
    this.state.r1, this.state.r2,
    this.state.r3, this.state.r4,
    this.state.r5, this.state.r6,
    this.state.r7, this.state.r8,
    this.state.r9, this.state.r10];
    for (var text in elements) {
      if (elements[text] == '') {
        nullVal = true;
        break;
      }
    }
    if (nullVal == true) {
      // this.setState({errorMessage: 'Uh-oh, make sure you have an input in all fields!'});
      let show = 'show';
      (() => { this.showNotification(show) })();
    } else {
      this.state.errorMessage = '';
      const createRes = {
        formID: this.props.location.state.code,
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        r1: this.state.r1,
        r2: this.state.r2,
        r3: this.state.r3,
        r4: this.state.r4,
        r5: this.state.r5,
        r6: this.state.r6,
        r7: this.state.r7,
        r8: this.state.r8,
        r9: this.state.r9,
        r10: this.state.r10,
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
      try {
        const newResponse = await client.mutate({ mutation: gql(mutations.createResponses), variables: { input: createRes } });
        this.setState({ redirect: true });
      } catch (e) {
        let match = 'matchingEmail';
        (() => { this.showNotification(match) })();
      }
    }
  }

  handleBackButton(e) {
    e.preventDefault();
    this.setState({ redirectHome: true });
  }

  handleError() {
    console.log('error reached');
    this.setState({ error: true });
  }

  renderTextareas() {
    let arr = [];
    for (var i = 1; i <= this.state.numResponses; i++) {
      let response = 'r' + i;
      let question = 'q' + i;
      arr.push(<p>{this.state[question]}</p>);
      arr.push(<Textarea
        id={response}
        value={this.state[response]}
        placeholder={'Response ' + i}
        handleChange={() => this.handleTextArea(response)} />)
    }
    return arr;
  }


  render() {
    if (this.state.redirectHome) {
      this.state.redirectHome = false;
      return <Redirect to={{ pathname: "/" }} />
    }
    if (!this.state.call) {
      (async () => { await this.findForm(); })();
    }
    if (this.state.redirect) {
      console.log("call thank you page");
      this.state.redirect = false;
      return <Redirect to={{ pathname: "/thankYou" }} />
    }
    if (this.state.error) {
      console.log("recall landing page");
      this.state.error = false;
      return <Redirect to={{
        pathname: "/",
        state: {
          message: "Oops... the code you entered isn't valid. Try another one :)",
          show: true,
        }
      }} />
    }
    // (() => { this.setMessage(); })();
    return (
      <div className="container">

        {this.state.instructions && <Instructions toggle={this.handleInstructions} />}
        <Helmet>
          <link rel="stylesheet" href="userform.css" />
          {/* <style>{'body { background-image: url(${background}); }'}</style> */}
        </Helmet>
        <div className="backButton">
          <Button
            action={this.handleBackButton}
            type={'primary'}
            title={'Back To Home'}
          /> { /*Submit */}
        </div>
        <div className='formContainer' id="container-fluid">
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Button
              action={this.handleInstructions}
              type={'primary'}
              title={'Instructions'}
            /> { /*Submit */}

            <Input inputType={'text'}
              title={'First Name:'}
              name={'fname'}
              style={{ margin: 10 }}
              value={this.state.fname}
              placeholder={'First Name'}
              handleChange={this.handleInput}

            /> {/* Last name */}

            <Input inputType={'text'}
              title={'Last Name:'}
              name={'lname'}
              style={{ margin: 10 }}
              value={this.state.lname}
              placeholder={'Last Name'}
              handleChange={this.handleInput}

            /> {/* Last name */}

            <Input inputType={'email'}
              title={'Email:'}
              name={'email'}
              style={{ margin: 10 }}
              value={this.state.email}
              placeholder={'Email'}
              handleChange={this.handleInput}

            /> {/* email */}

            {this.state.invalidateEmail && <p className="emailError"> Please enter a valid email! </p>}

            {this.renderTextareas()}

            {/* <p>{this.state.q1}</p>

            <Textarea 
              id={'r1'}
              value={this.state.r1}
              placeholder={'Response 1'}
              handleChange={() => this.handleTextArea('r1')}

            /> 

            <p>{this.state.q2}</p>

            <Textarea 
              id={'r2'}
              value={this.state.r1}
              placeholder={'Response 2'}
              handleChange={() => this.handleTextArea('r2')}

            /> 

            <p>{this.state.q3}</p>
            <Textarea 
              id={'r3'}
              value={this.state.r1}
              placeholder={'Response 3'}
              handleChange={() => this.handleTextArea('r3')}

            /> 

            <p>{this.state.q4}</p>
            <Input inputType={'text'}
              name={'r4'}
              value={this.state.r4}
              placeholder={'Response 4'}
              handleChange={this.handleInput}

            /> 


            <p>{this.state.q5}</p>
            <Input inputType={'text'}
              name={'r5'}
              value={this.state.r5}
              placeholder={'Response 5'}
              handleChange={this.handleInput}

            /> 

            <p>{this.state.q6}</p>
            <Input inputType={'text'}
              name={'r6'}
              value={this.state.r6}
              placeholder={'Response 6'}
              handleChange={this.handleInput}

            /> 

            <p>{this.state.q7}</p>
            <Input inputType={'text'}
              name={'r7'}
              value={this.state.r7}
              placeholder={'Response 7'}
              handleChange={this.handleInput}

            /> 

            <p>{this.state.q8}</p>
            <Input inputType={'text'}
              name={'r8'}
              value={this.state.r8}
              placeholder={'Response 8'}
              handleChange={this.handleInput}

            />

            <p>{this.state.q9}</p>
            <Input inputType={'text'}
              name={'r9'}
              value={this.state.r9}
              placeholder={'Response 9'}
              handleChange={this.handleInput}

            /> 

            <p>{this.state.q10}</p>
            <Input inputType={'text'}
              name={'r10'}
              value={this.state.r10}
              placeholder={'Response 10'}
              handleChange={this.handleInput}

            />  */}

            <div className="submitButton">
              <Button
                action={this.handleFormSubmit}
                disabled={this.state.invalidateEmail}
                type={'primary'}
                title={'Submit'}
              /> { /*Submit */}
            </div>

            <Notification show={this.state.show} />
            <Notification match={this.state.matchingEmail} />
          </form>


        </div>
      </div>
    );
  }
}

class Notification extends React.Component {
  render() {
    return (
      <div className="notifications">
        <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have an input in all fields! </span>
        <span className={this.props.match ? 'match' : ''}> The email you entered has already been used! </span>
      </div>
    )
  }
}

class Instructions extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.toggle(e);
  }
  render() {
    return (
      <div className="popup">
        <div className="popup-content">
          <div className="words">
            <h3> Welcome to Sheep! </h3>
            <p> Your score per category will be the number of responses that were the same as yours. You don’t need to pick the correct answer, a clever answer, or a unique answer — you should pick the most common answer, aka the Sheep answer. (Like Family Feud.) </p>
            <p> For example, in a 30-player game: </p>
            <div className="example">
              <p> Category: A television manufacturer</p>

              <p>Responses:</p>
              <p>Samsung - 15</p>
              <p>Sony - 10</p>
              <p>LG - 5</p>
            </div>
            <p>If you put Sony, you would receive 10 points for this round.</p>
            <ul>
              <li>Common answers will be grouped at my discretion (e.g., "child" and "kid").</li>
              <li>Please don't submit multiple responses to the same question (e.g., "Pop/Rock/Rap"). If you do, I will just pick the first thing you submitted as your answer ("Pop").</li>
              <li>You can use any reference or technology to help pick your responses.</li>
              <li>You cannot speak with anyone else about your answers until the scores are revealed. I'll disqualify any players suspected of collusion.</li>
            </ul>
            <p>Last reminder, you're trying to get the SHEEP answer, not the right answer!</p>
            <p>Good luck!</p>
            <Button
              action={this.handleClose}
              type={'primary'}
              title={'Close'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MainPage);