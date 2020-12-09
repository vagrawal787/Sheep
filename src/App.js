
import './App.css';
import React, {Component, Fragment} from 'react';
import LandingFormContainer from './containers/LandingFormContainer';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import LandPage from "./pages/landingForm.jsx";
import NotFoundPage from "./pages/404.jsx";
import MainPage from "./pages/userForm.jsx";

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
          <Redirect to ="/404" component = {LandPage}/>
        </Switch>
      </Router> 
    );
  }
}

export default App;
