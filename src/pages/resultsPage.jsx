import React, { Component } from 'react';
import LandingFormContainer from '../containers/LandingFormContainer';
import "./CSS/resultspage.css"
class ResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div id="podium-box" className="row">
                <div className="col-md-4 step-container m-0 p-0">
                    <div>
                        Text 2
                    </div>
                    <div id="second-step" className="bg-blue step centerBoth podium-number">
                        2
                     </div>
                </div>
                <div className="col-md-4 step-container m-0 p-0">
                    <div>
                        Text 1
                    </div>
                    <div id="first-step" className="bg-blue step centerBoth podium-number">
                        1
                    </div>
                </div>
                <div className="col-md-4 step-container m-0 p-0">
                    <div>
                        Text 3
                    </div>
                    <div id="third-step" className="bg-blue step centerBoth podium-number">
                        3
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultsPage;