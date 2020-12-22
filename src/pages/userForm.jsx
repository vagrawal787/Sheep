import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import LandPage from "../pages/landingForm.jsx";
import ThankPage from '../pages/thankPage';

import {API} from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

class MainPage extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            q1:'',
            q2:'',
            q3:'',
            q4:'',
            q5:'',
            q6:'',
            q7:'',
            q8:'',
            q9:'',
            q10:'',
            r1:'',
            r2:'',
            r3:'',
            r4:'',
            r5:'',
            r6:'',
            r7:'',
            r8:'',
            r9:'',
            r10:'',
            redirect: false,
            error: false,
            call : false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleError = this.handleError.bind(this);
        
    }

    async findForm() {
      console.log("hi");
      
      console.log(this.props.code);
      if (!this.state.call){
          const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
              type: AUTH_TYPE.API_KEY,
              apiKey: awsconfig.aws_appsync_apiKey,
            },
          });
          const apiData = await client.query({query: gql(queries.getForm), variables: { id: this.props.code}});
        if (apiData.data.getForm == null){
          (() => {this.handleError();})();
        }
        else{
          this.setState({q1: apiData.data.getForm.q1,
            q2: apiData.data.getForm.q2,
            q3: apiData.data.getForm.q3,
            q4: apiData.data.getForm.q4,
            q5: apiData.data.getForm.q5,
            q6: apiData.data.getForm.q6,
            q7: apiData.data.getForm.q7,
            q8: apiData.data.getForm.q8,
            q9: apiData.data.getForm.q9,
            q10: apiData.data.getForm.q10});
          this.state.call = true;
         }
      }
    }

    handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState({[name]: value});
    }

    handleFormSubmit(e) {
      e.preventDefault();
      this.setState({redirect: true});
    }
    
    handleError() {
      console.log('error reached');
      this.setState({error: true});
    }


    render() {
      (async () => { await this.findForm();})();
      if (this.state.redirect){
        console.log("call thank you page");
        return <ThankPage/>
      }
      if (this.state.error){
        console.log("recall landing page");
        this.state.error = false;
        return <LandPage message={"Oops... the code you entered isn't valid. Try another one :)"}/>
      }
      return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <p>{this.state.q1}</p>
       
            <Input inputType={'text'}
                   title= {'Question 1:'} 
                   name= {'r1'}
                   value={this.state.r1} 
                   placeholder = {'Response 1'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 1 */}

            <p>{this.state.q2}</p>

            <Input inputType={'text'}
                   title= {'Question 2:'} 
                   name= {'r2'}
                   value={this.state.r2} 
                   placeholder = {'Response 2'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 2 */}

            <p>{this.state.q3}</p>
            <Input inputType={'text'}
                   title= {'Question 3:'} 
                   name= {'r3'}
                   value={this.state.r3} 
                   placeholder = {'Response 3'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 3 */}

            <p>{this.state.q4}</p>
            <Input inputType={'text'}
                   title= {'Question 4:'} 
                   name= {'r4'}
                   value={this.state.r4} 
                   placeholder = {'Response 4'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 4 */}


            <p>{this.state.q5}</p>  
            <Input inputType={'text'}
                   title= {'Question 5:'} 
                   name= {'r5'}
                   value={this.state.r5} 
                   placeholder = {'Response 5'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 5 */}

            <p>{this.state.q6}</p>
            <Input inputType={'text'}
                   title= {'Question 6:'} 
                   name= {'r6'}
                   value={this.state.r6} 
                   placeholder = {'Response 6'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 6 */}

            <p>{this.state.q7}</p>
            <Input inputType={'text'}
                   title= {'Question 7:'} 
                   name= {'r7'}
                   value={this.state.r7} 
                   placeholder = {'Response 7'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 7 */}

            <p>{this.state.q8}</p>
            <Input inputType={'text'}
                   title= {'Question 8:'} 
                   name= {'r8'}
                   value={this.state.r8} 
                   placeholder = {'Response 8'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 8 */}

            <p>{this.state.q9}</p>
            <Input inputType={'text'}
                   title= {'Question 9:'} 
                   name= {'r9'}
                   value={this.state.r9} 
                   placeholder = {'Response 9'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 9 */}

            <p>{this.state.q10}</p>
            <Input inputType={'text'}
                   title= {'Question 10:'} 
                   name= {'r10'}
                   value={this.state.r10} 
                   placeholder = {'Response 10'}
                   handleChange = {this.handleInput}
                   
            /> {/* Question 10 */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
          /> { /*Submit */ }
          
          
        </form>
        // <div>
        //   {this.state.q1}
        // </div>
      );
    }
  }
  
  export default MainPage;