
import './App.css';
import React, {Component, NewTestComp} from 'react';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LandPage from "./pages/landingForm.jsx";
import NotFoundPage from "./pages/404.jsx";
import MainPage from "./pages/userForm.jsx";
import ThankPage from "./pages/thankPage.jsx";
import CreatePage from "./pages/formCreator.jsx";
import ThankFormCreate from "./pages/thankYouForm.jsx";
import ConsolePage from "./pages/adminConsole.jsx";
import ResponseManager from "./pages/responseManager.jsx";
import EditPage from "./pages/formEditor.jsx";
import ResultsPage from "./pages/resultsPage.jsx";



import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = {LandPage} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/404" component = {NotFoundPage} />
          <Route exact path = "/userForm" component = {MainPage} render={(props) => <NewTestComp {...props}/>} />
          <Route exact path = "/thankYou" component = {ThankPage} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/createForm" component = {CreatePage} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/formCreated" component = {ThankFormCreate} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/adminConsole" component = {ConsolePage} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/responseManager" component = {ResponseManager} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/formEditor" component = {EditPage} render={(props) => <NewTestComp {...props}/>}/>
          <Route exact path = "/resultsPage" component = {ResultsPage} render={(props) => <NewTestComp {...props}/>}/>
        
          <Redirect to ="/404" component = {LandPage}/>
        </Switch>
      </Router> 
    );
  }
}

export default App;
