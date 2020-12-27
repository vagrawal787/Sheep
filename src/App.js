
import './App.css';
import React, {Component, Fragment} from 'react';
import LandingFormContainer from './containers/LandingFormContainer';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import LandPage from "./pages/landingForm.jsx";
import NotFoundPage from "./pages/404.jsx";
import MainPage from "./pages/userForm.jsx";
import ThankPage from "./pages/thankPage.jsx";
import CreatePage from "./pages/formCreator.jsx";
import ThankFormCreate from "./pages/thankYouForm.jsx";
import ConsolePage from "./pages/adminConsole.jsx";


import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = {LandPage}/>
          <Route exact path = "/404" component = {NotFoundPage}/>
          <Route exact path = "/userForm" component = {MainPage} />
          <Route exact path = "/thankYou" component = {ThankPage} />
          <Route exact path = "/createForm" component = {CreatePage} />
          <Route exact path = "/formCreated" component = {ThankFormCreate} />
          <Route exact path = "/adminConsole" component = {ConsolePage} />
          <Redirect to ="/404" component = {LandPage}/>
        </Switch>
      </Router> 
    );
  }
}

export default App;
