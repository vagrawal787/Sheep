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
       this.setState({code: value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({redirect: true});
  }   

  render() {
    if (this.state.redirect){
        console.log("call mainpage");
        console.log(this.state.code)
        this.state.redirect = false;
        return <MainPage code={this.state.code} error={false}/>
    }
    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'number'}
                   title= {'Code:'} 
                   name= {'code'}
                   value={this.state.code} 
                   placeholder = {'Enter your code'}
                   handleChange = {this.handleInput}
                   
            /> {/* Code */}

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