import React, {Component} from 'react';  
import LandingFormContainer from '../containers/LandingFormContainer';

class LandPage extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }
  render() {
    return (
        <div>
          <LandingFormContainer redirect = {false}/>  
          <p> {this.state.message} </p>
        </div>
    );
  }
}

export default LandPage;