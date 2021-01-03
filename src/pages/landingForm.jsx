import React, {Component} from 'react';  
import LandingFormContainer from '../containers/LandingFormContainer';

class LandPage extends Component {  

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <div>
          <LandingFormContainer redirect={false}/>
          <p>  </p>
        </div>
    );
  }
}

export default LandPage;