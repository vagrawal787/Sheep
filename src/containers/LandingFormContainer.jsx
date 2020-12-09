import React, {Component} from 'react';  

/* Import Components */ 
import Input from '../components/Input';  
import Button from '../components/Button';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import MainPage from "../pages/userForm.jsx";

class LandingFormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        code: '',
        redirect: false,

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  
  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
       this.setState({code: value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state;
    this.setState({redirect: true});
  }   

  render() {
    if (this.state.redirect){
        return <MainPage code={this.state.code}/>
    }
    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'text'}
                   title= {'Code:'} 
                   name= {'code'}
                   value={this.state.code} 
                   placeholder = {'Enter your code'}
                   handleChange = {this.handleInput}
                   
            /> {/* Name of the user */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
          /> { /*Submit */ }
          
          
        </form>
  
    );
  }
}

export default LandingFormContainer;