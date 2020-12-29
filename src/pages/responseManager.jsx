import React, { Component } from 'react';
import Button from '../components/Button';

import {BrowserRouter as Redirect} from 'react-router-dom';

class ResponseManager extends Component {

    render() {

        return (
            <div>
                <h1>
                    Responses for form: {this.props.location.state.formID}
                </h1>
            </div>
        );
    }
}

export default ResponseManager;