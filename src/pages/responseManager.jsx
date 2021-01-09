import React, { Component } from 'react';
import Button from '../components/Button';
import "./CSS/responsemanager.css"

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class ResponseManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.formID,
            redirectToEdit: false,
            seen: false,
            redirectToAdmin : false,
        }
        this.handleEditFormButton = this.handleEditFormButton.bind(this);
        this.redirectToAdmin = this.redirectToAdmin.bind(this);
    }

    handleEditFormButton(e) {
        e.preventDefault();
        this.setState({ redirectToEdit: true });
    }

    async handleCloseForm(e){
        e.preventDefault();
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        let mutData = '';
        try {
            mutData = await client.mutate({
                mutation: gql(mutations.updateForm),
                variables: { id: this.state.id, active: false }
            });
        } catch (e) {
            console.log(e);
        }
        (() => {this.togglePop();})();
    }

    togglePop(){
        this.setState({seen: !this.state.seen});
    }

    redirectToAdmin(){
        this.setState({redirectToAdmin: true});
    }

    render() {
        if (this.state.redirectToEdit) {
            this.state.redirectToEdit = false;
            return <Redirect to={{
                pathname: "/formEditor",
                state: {
                    formID: this.state.id,
                    userID: this.props.location.state.userID
                }
            }} />
        }
        if (this.state.redirectToAdmin) {
            this.state.redirectToAdmin = false;
            return <Redirect to ={{
                pathname:"/adminConsole"
            }} />
        }
        return (
            <div>
                <h1>
                    Responses for form: {this.props.location.state.formID}
                </h1>
                <Table id={this.state.id} />
                <Button
                    action={this.handleEditFormButton}
                    type={'primary'}
                    title={'Edit Form'}
                /> { /*Submit */}
                <Button
                    action={(e)=>this.handleCloseForm(e)}
                    type={'primary'}
                    title={'Close Form'}
                /> { /*Submit */}
                <Button
                    action={this.redirectToAdmin}
                    type={'primary'}
                    title={'Go back to Console'}
                /> { /*Submit */}
                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
            </div>
        );
    }
}

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            id: this.props.id,
            responses: [{email: 'blah'}],
            call: false,
            header: [],
        }
        this.createGroups = this.createGroups.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.compareByKey = this.compareByKey.bind(this);
    }
    async createGroups() {
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        let apiData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getFormResponseList),
                variables: { id: this.state.id }
            });
            console.log(apiData);
            console.log("i got the deets");
            this.state.call = true;
        } catch (e) {
            console.log(e);
        }
        if (apiData == '' || apiData.data.getFormResponseList == null) {
            try {
                const mutData = await client.mutate({
                    mutation: gql(mutations.createFormResponseList),
                    variables: { input: { id: this.state.id } }
                });
                this.state.call = true;
            } catch (e) {
                console.log(e);
            }
        } else {
            this.setState({
                responses: apiData.data.getFormResponseList.forms.items,
            });
            // const headResult = (async() => { this.renderTableHeader(); })();
            // this.setState({ header: headResult });
            // console.log(this.state.header);
        }
    }

    handleSort(key){
        this.setState({switchSort: !this.state.switchSort});
        let copyResponses = [...this.state.responses];
        copyResponses.sort(this.compareByKey(key));
        this.setState({responses: copyResponses});
    }

    compareByKey(key){
        if(this.state.switchSort){
            return function(a,b){
                if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
                if (a[key] > b[key]) return 1;  //check for value if the second value is bigger then first return 1
                return 0;
            };
        }else{
            return function(a,b){
                if (a[key] > b[key]) return -1; 
                if (a[key] < b[key]) return 1; 
                return 0;
            };
        }
    }

    renderTableHeader() {
        let header = Object.keys((this.state.responses)[0]);
        header.splice(0,1);
        header.pop();

 
        return header.map((key, index) => {
            return <th key={index}><Button
            action={()=>this.handleSort(key)}
            type={'primary'}
            title={key.toUpperCase()}
        /> { /*Submit */}</th>
        });
    }

    renderTableData() {
        return this.state.responses.map((response, index) => {
            const { formID, email, fname, lname, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r1_sum, r2_sum, r3_sum, r4_sum, r5_sum, r6_sum, r7_sum, r8_sum, r9_sum, r10_sum } = response //destructuring
            return (
                <tr key={formID}>
                    <td>{email}</td>
                    <td>{fname}</td>
                    <td>{lname}</td>
                    <td>{r1}</td>
                    <td>{r2}</td>
                    <td>{r3}</td>
                    <td>{r4}</td>
                    <td>{r5}</td>
                    <td>{r6}</td>
                    <td>{r7}</td>
                    <td>{r8}</td>
                    <td>{r9}</td>
                    <td>{r10}</td>
                    <td>{r1_sum}</td>
                    <td>{r2_sum}</td>
                    <td>{r3_sum}</td>
                    <td>{r4_sum}</td>
                    <td>{r5_sum}</td>
                    <td>{r6_sum}</td>
                    <td>{r7_sum}</td>
                    <td>{r8_sum}</td>
                    <td>{r9_sum}</td>
                    <td>{r10_sum}</td>
                </tr>
            )
        })
    }

    render() {
        if (!this.state.call) {
            (async () => { this.createGroups(); })();
        }
        return (
            <div>
                <h1 id='title'>React Dynamic Table</h1>
                <table id='responses'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>)
    }


}

class PopUp extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            id: this.props.id,
            responses: [{email: 'blah'}],
            call: false,
            header: [],
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.toggle();
    }

    render() {
        return (
         <div className="modal">
           <div className="modal_content">
           <span className="close" onClick={this.handleClick}>&times;</span>
           <p>The responses for this form have been closed.</p>
          </div>
         </div>
        );
       }
}

export default ResponseManager;