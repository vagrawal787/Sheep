import React, { Component } from 'react';
import LandPage from '../pages/landingForm';
import Button from '../components/Button';
import './CSS/thankpage.css'

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

class ThankPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }


  handleButtonPress(e) {
    e.preventDefault();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect){
      this.state.redirect = false;
      return <Redirect to = {{pathname: "/" }}/>
  }
    return (
      <div className = 'containerThank'>
        <div className = 'content'>
        <h1>
          Thanks for playing!
            </h1>
        <h3>
          Be sure to check back at the end of the week for results.
            </h3>
        <Button
          action={this.handleButtonPress}
          type={'primary'}
          title={'Return to Home Page'}
        />
        </div>
      </div>
    );
  }
}

export default ThankPage;