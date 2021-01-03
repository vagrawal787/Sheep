import React, { Component } from 'react';
import '../App.css';
import { Helmet } from "react-helmet";
// import background from '../images/sheepbackimage.jpg'

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class LandingFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      redirectSubmit: false,
      redirectAdmin: false,
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

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.code == '') {
      this.setState({ errorMessage: 'Uh-oh, make sure you have inputted a code!' });
      (() => {this.showNotification()})();
    } else {
      this.setState({ redirectSubmit: true });
    }
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
      return <Redirect to={{ pathname: "/adminConsole" }} />
    }
    return (
      <div className="container">
        <Helmet>
          <link rel="stylesheet" href="landing.css" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500@&display=swap" rel="stylesheet"/>
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
              <Input inputType={'number'}
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

         <Notification show = {this.state.show} />

        </div>
      </div>


    );
  }
}

class Notification extends React.Component {
  render() {
    return <span className={this.props.show ? 'show' : ''}> Uh-oh, make sure you have inputted a code! </span>
  }v
}

export default LandingFormContainer;