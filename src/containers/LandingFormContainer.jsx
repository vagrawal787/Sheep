import React, { Component } from 'react';

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';

import { BrowserRouter as Redirect } from 'react-router-dom';

class LandingFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      redirectSubmit: false,
      redirectAdmin: false,

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAdminButton = this.handleAdminButton.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleInput(e) {
    let value = e.target.value;
    this.setState({ code: value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ redirectSubmit: true });
  }
  handleAdminButton(e) {
    e.preventDefault();
    this.setState({ redirectAdmin: true });
  }

  render() {
    
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
      return <Redirect to = {{pathname: "/adminConsole"}} />
    }

    return (
      <div>
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

          <Input inputType={'number'}
            title={'Code:'}
            name={'code'}
            value={this.state.code}
            placeholder={'Enter your code'}
            handleChange={this.handleInput}

          /> {/* Code */}

          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Submit'}
          /> { /*Submit */}


        </form>
        <Button
          action={this.handleAdminButton}
          type={'primary'}
          title={'Go To Admin'}
        /> { /* Admin */}

        <p> {this.state.message} </p>
      </div>


    );
  }
}

export default LandingFormContainer;