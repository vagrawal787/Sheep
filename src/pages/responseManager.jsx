import React, { Component } from 'react';
import Button from '../components/Button';
import "./CSS/responsemanager.css"
import Loader from 'react-loader-spinner'

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
            open: this.props.location.state.status,
            redirectToAdmin: false,
            redirectToMatching: false,
            sent: false,
            loading: false,
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
            q9: "",
            q10: "",
            call: false
        }
        this.handleEditFormButton = this.handleEditFormButton.bind(this);
        this.handleMatchingPageButton = this.handleMatchingPageButton.bind(this);
        this.redirectToAdmin = this.redirectToAdmin.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.sendResults = this.sendResults.bind(this);
        this.toggleSent = this.toggleSent.bind(this);
        this.findForm = this.findForm.bind(this);
        this.renderWordScores = this.renderWordScores.bind(this);
        this.exportTableToCSV = this.exportTableToCSV.bind(this);
    }

    handleEditFormButton(e) {
        e.preventDefault();
        this.setState({ redirectToEdit: true });
    }
    async handleMatchingPageButton(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "formID": this.state.id.toString() });
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        await fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
        this.setState({ loading: false });
        this.setState({ redirectToMatching: true });
    }

    async handleCloseForm(e) {
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
                variables: { input: { id: this.state.id, active: false } }
            });
        } catch (e) {
            console.log(e);
        }
        (() => { this.toggleClose(); })();
    }

    async handleOpenForm(e) {
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
                variables: { input: { id: this.state.id, active: true } }
            });
        } catch (e) {
            console.log(e);
        }
        (() => { this.toggleOpen(); })();
    }

    async sendResults(e) {
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
                variables: { input: { id: this.state.id, results: true } }
            });
        } catch (e) {
            console.log(e);
        }
        (() => { this.toggleSent(); })();
    }

    async findForm() {
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        const apiData = await client.query({ query: gql(queries.getForm), variables: { id: this.state.id } });
        if (apiData.data.getForm == null) {
            this.state.call = true;
            (() => { this.handleError(); })();
        }
        else {
            this.state.call = true;
            this.setState({
                q1: apiData.data.getForm.q1,
                q2: apiData.data.getForm.q2,
                q3: apiData.data.getForm.q3,
                q4: apiData.data.getForm.q4,
                q5: apiData.data.getForm.q5,
                q6: apiData.data.getForm.q6,
                q7: apiData.data.getForm.q7,
                q8: apiData.data.getForm.q8,
                q9: apiData.data.getForm.q9,
                q10: apiData.data.getForm.q10
            });
        }
    }

    toggleSent() {
        this.setState({ sent: true });
    }

    toggleClose() {
        this.setState({ open: false });
    }

    toggleOpen() {
        this.setState({ open: true });
    }

    redirectToAdmin() {
        this.setState({ redirectToAdmin: true });
    }
    renderWordScores() {
        var arr = []
        for (var i = 1; i <= 10; i++) {
            arr.push(<div className="scoreTables">
                <CommonWordsTable id={this.state.id} round={'r' + i} />
            </div>)
        }
        return arr;
    }

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }

    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table.wordscores tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }

    render() {
        if (this.state.redirectToMatching) {
            this.state.redirectToMatching = false;
            return <Redirect to={{
                pathname: "/matchingPage",
                state: {
                    formID: this.state.id,
                    userID: this.props.location.state.userID,
                    status: this.state.open
                }
            }} />
        }
        if (this.state.redirectToEdit) {
            this.state.redirectToEdit = false;
            return <Redirect to={{
                pathname: "/formEditor",
                state: {
                    formID: this.state.id,
                    userID: this.props.location.state.userID,
                }
            }} />
        }
        if (this.state.redirectToAdmin) {
            this.state.redirectToAdmin = false;
            return <Redirect to={{
                pathname: "/adminConsole"
            }} />
        }
        if (!this.state.call) {
            (async () => { await this.findForm() })();
        }
        return (
            <div className="responseContainer">
                <h1>
                    Responses for form: {this.props.location.state.formID}
                </h1>
                {!this.state.open ? <h3 className="closed"> Form has been closed.</h3> : <h3 className="open"> Form is open for responses. </h3>}
                {this.state.sent ? <h3 className="sent"> Form results have been sent. </h3> : null}
                <div class="userScoreTable">
                    <Table id={this.state.id} />
                </div>
                <div class="responseTable">
                    <ResponsesTable id={this.state.id} var={this.state} />
                </div>
                <div>
                    <h1> Word Scores</h1>
                    {this.renderWordScores()}
                </div>
                <Button
                    action={this.handleEditFormButton}
                    type={'primary'}
                    title={'Edit Form'}
                /> { /*Submit */}
                <Button
                    action={(e) => this.handleCloseForm(e)}
                    type={'primary'}
                    title={'Close Form'}
                /> { /*Submit */}
                <Button
                    action={(e) => this.handleOpenForm(e)}
                    type={'primary'}
                    title={'Open Form'}
                /> { /*Submit */}
                <Button
                    action={this.redirectToAdmin}
                    type={'primary'}
                    title={'Go back to Console'}
                /> { /*Submit */}
                <Button
                    action={(e) => this.sendResults(e)}
                    type={'primary'}
                    title={'Send results'}
                /> { /*Submit */}
                <Button
                    action={this.handleMatchingPageButton}
                    type={'primary'}
                    title={'Resolve Word Conflicts'}
                /> { /*Submit */}
                <Button
                    action={() => this.exportTableToCSV(this.state.id + "_wordScores.csv")}
                    type={'primary'}
                    title={'Export Word Scores to CSV'}
                /> { /*Submit */}
                {this.state.loading && <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />}

            </div>
        );
    }
}

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            id: this.props.id,
            responses: [{ email: 'blah' }],
            call: false,
            header: [],
            loading: false,
        }
        this.createGroups = this.createGroups.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.compareByKey = this.compareByKey.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
        this.exportTableToCSV = this.exportTableToCSV.bind(this);
    }

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }

    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table.userscores tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }


    async createGroups() {
        this.setState({ call: true });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "formID": this.state.id.toString() });
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            noResponses: false,
        };
        this.setState({ loading: true });
        await fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        this.setState({ loading: false });
        let apiData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getFormResponseList),
                variables: { id: this.state.id }
            });
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
        } else if (apiData.data.getFormResponseList.forms.items.length == 0) {
            this.setState({ noResponses: true });
            this.state.call = true
        }
        else {
            this.setState({
                responses: apiData.data.getFormResponseList.forms.items,
                call: true
            });
            // const headResult = (async() => { this.renderTableHeader(); })();
            // this.setState({ header: headResult });
            // console.log(this.state.header);
        }
    }

    handleSort(key) {
        this.setState({ switchSort: !this.state.switchSort });
        let copyResponses = [...this.state.responses];
        copyResponses.sort(this.compareByKey(key));
        this.setState({ responses: copyResponses });
    }

    compareByKey(key) {
        if (this.state.switchSort) {
            return function (a, b) {
                if (Number(a[key]) < Number(b[key])) return -1; // check for value if the second value is bigger then first return -1
                if (Number(a[key]) > Number(b[key])) return 1;  //check for value if the second value is bigger then first return 1
                return 0;
            };
        } else {
            return function (a, b) {
                if (Number(a[key]) > Number(b[key])) return -1;
                if (Number(a[key]) < Number(b[key])) return 1;
                return 0;
            };
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        this.setState({ call: false });
        this.forceUpdate();
    }

    renderTableHeader() {
        let header = Object.keys((this.state.responses)[0]);
        header.splice(0, 1);
        header.pop();
        header.pop();
        header.pop();


        return header.map((key, index) => {
            return <th key={index}><Button
                action={() => this.handleSort(key)}
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
        if (this.state.noResponses) {
            return null
        } else {
            return (
                <div className = 'userScoreTableCont'>
                    <h1 id='title'>User Scores</h1>
                    {this.state.loading && <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />}
                    <table id='responses' className='userscores'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                    <Button
                        action={this.handleUpdate}
                        type={'primary'}
                        title={'Update'}
                    /> { /*Submit */}
                    <Button
                        action={() => this.exportTableToCSV(this.state.id + "_userScores.csv")}
                        type={'primary'}
                        title={'Export User Scores to CSV'}
                    /> { /*Submit */}
                </div>)
        }
    }


}

class ResponsesTable extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            id: this.props.id,
            responses: [{ email: 'blah' }],
            call: false,
            header: [],
            reset: false,
            noResponses: false,
            formquestions: false
        }
        this.createGroups = this.createGroups.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.compareByKey = this.compareByKey.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.resetPage = this.resetPage.bind(this);
        this.handleFormQuestions = this.handleFormQuestions.bind(this);
        this.downloadCSV = this.downloadCSV.bind(this);
        this.exportTableToCSV = this.exportTableToCSV.bind(this);
    }
    async createGroups() {
        this.setState({ call: true });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "formID": this.state.id.toString() });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        this.setState({ loading: true });
        fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        this.setState({ loading: false });
        let apiData = {};
        try {
            console.log('fetching cleaned data')
            apiData = await client.query({ query: gql(queries.listResponseCleaneds), variables: { filter: { formID: { eq: this.state.id.toString() } } } });
            if (apiData === []){
                while (apiData.data.listResponseCleaneds.nextToken){
                    nextData = await client.query({ query: gql(queries.listResponseCleaneds), variables: { filter: { formID: { eq: this.state.id.toString() } }, nextToken: apiData.data.listResponseCleaneds.nextToken } });
                    apiData.data.listResponseCleaneds.items = apiData.data.listResponseCleaneds.items.concat(nextData.data.listResponseCleaneds.items)
                }
            }
        } catch (e) {
            console.log(e);
        }
        console.log(this.state.id)
        console.log('this is apiData: ', apiData);
        if (apiData == '' || apiData.data.listResponseCleaneds == null) {
            this.setState({
                noResponses: true,
                call: true
            });
        } else if (apiData.data.listResponseCleaneds.items.length == 0) {
            this.setState({
                noResponses: true,
                call: true
            });
        } else {
            this.setState({
                responses: apiData.data.listResponseCleaneds.items,
                call: true,
            });
        }
    }

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }

    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table.responses tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }

    resetPage() {
        window.location.reload(false);
    }

    handleUpdate(e) {
        e.preventDefault();
        this.setState({ call: false });
        this.forceUpdate();
    }

    handleSort(key) {
        this.setState({ switchSort: !this.state.switchSort });
        let copyResponses = [...this.state.responses];
        copyResponses.sort(this.compareByKey(key));
        this.setState({ responses: copyResponses });
    }

    compareByKey(key) {
        if (this.state.switchSort) {
            return function (a, b) {
                if (a[key].toLowerCase() < b[key].toLowerCase()) return -1; // check for value if the second value is bigger then first return -1
                if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;  //check for value if the second value is bigger then first return 1
                return 0;
            };
        } else {
            return function (a, b) {
                if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
                if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
                return 0;
            };
        }
    }

    renderTableHeader() {
        let header = Object.keys((this.state.responses)[0]);
        header.splice(0, 1);
        header.pop();
        header.pop();
        header.pop();


        return header.map((key, index) => {
            return <th key={index}><Button
                action={() => this.handleSort(key)}
                type={'primary'}
                title={key.toUpperCase()}
            /> { /*Submit */}</th>
        });
    }

    renderTableData() {
        return this.state.responses.map((response, index) => {
            const { formID, email, fname, lname, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, } = response //destructuring
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
                </tr>
            )
        })
    }

    handleFormQuestions(e) {
        e.preventDefault();
        this.setState({ formquestions: !this.state.formquestions });
        // if (!this.state.formquestions) {
        //   document.getElementById('container-fluid').style.opacity = "0";
        // } else {
        //   document.getElementById('container-fluid').style.opacity = '1';
        // }
    }

    render() {
        if (!this.state.call) {
            (async () => { this.createGroups(); })();
        }
        this.state.reset = false;
        if (this.state.noResponses) {
            return (<div><h3> This form has no responses yet! Check back in a bit. </h3>
                <Button
                action={this.handleUpdate}
                type={'primary'}
                title={'Update'}
            /> { /*Submit */}
            </div>)
        } else {
            return (
                <div>
                    <div>
                        <h1 id='title'>Responses Cleaned</h1>
                        {this.state.loading && <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />}
                        <Button
                            action={this.handleFormQuestions}
                            type={'primary'}
                            title={'Form Questions'}
                        /> { /*Submit */}
                        {this.state.formquestions && <FormQuestions toggle={this.handleFormQuestions} var={this.props.var} />}
                        <table id='responses' className="responses">
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                        <Button
                            action={this.handleUpdate}
                            type={'primary'}
                            title={'Update'}
                        /> { /*Submit */}
                        <Button
                            action={() => this.exportTableToCSV(this.state.id + "_userResponses.csv")}
                            type={'primary'}
                            title={'Export Responses Cleaned to CSV'}
                        /> { /*Submit */}
                    </div>
                </div>
            )
        }
    }


}

class FormQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        e.preventDefault();
        this.props.toggle(e);
    }
    render() {
        return (
            <div className="popupForm">
                <div className="popup-contentForm">
                    <div className="words">
                        <p> Q1: {this.props.var.q1} </p>
                        <p> Q2: {this.props.var.q2} </p>
                        <p> Q3: {this.props.var.q3} </p>
                        <p> Q4: {this.props.var.q4} </p>
                        <p> Q5: {this.props.var.q5} </p>
                        <p> Q6: {this.props.var.q6} </p>
                        <p> Q7: {this.props.var.q7} </p>
                        <p> Q8: {this.props.var.q8} </p>
                        <p> Q9: {this.props.var.q9} </p>
                        <p> Q10: {this.props.var.q10} </p>
                        <Button
                            action={this.handleClose}
                            type={'primary'}
                            title={'Close'}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class CommonWordsTable extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            id: this.props.id,
            round: this.props.round,
            responses: [[0, 'word']],
            call: false,
            loading: false,
        }
        // this.createGroups = this.createGroups.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        // this.handleSort = this.handleSort.bind(this);
        // this.compareByKey = this.compareByKey.bind(this);
        // this.handleUpdate = this.handleUpdate.bind(this);
        // this.downloadCSV = this.downloadCSV.bind(this);
        // this.exportTableToCSV = this.exportTableToCSV.bind(this);
    }
    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "formID": this.state.id.toString() });
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            noResponses: false,
        };
        this.setState({ loading: true });
        await fetch("https://5q71mrnwdc.execute-api.us-west-2.amazonaws.com/dev", requestOptions).catch(error => console.log('error', error));
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        this.setState({ loading: false });
        let apiData = '';
        try {
            apiData = await client.query({
                query: gql(queries.getWordScore),
                variables: { formID: this.state.id, round: this.state.round }
            });
        } catch (e) {
            console.log(e);
        }
        if (!(apiData == '' || apiData.data.getWordScore == null)) {
            this.setState({
                responses: apiData.data.getWordScore.scores,
                call: true
            })
        }
    }



    renderTableData() {
        var responses = this.state.responses.toString();
        responses = responses.slice(1, -1)
        responses = responses.replace(/,/g, '')
        responses = responses.split(/]/g)
        var arr = [];
        for (var index = 0; index < responses.length; index++) {
            var str = responses[index].substring(1);
            str = str.replace("[", '');
            var entry = str.split(' ');
            var entrystring = '';
            for (var i = 1; i < entry.length; i++){
                entrystring += entry[i] + ' ';
            }
            arr.push(<tr><td>{entrystring}</td><td>{entry[0]}</td></tr>)
        }
        return arr;
    }
    render() {
        // if (!this.state.call) {
        //     (async () => { this.createGroups(); })();
        // }
        // if (this.state.noResponses) {
        //     return null
        // } else {
        return (
            <div>
                {this.state.loading && <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />}
                <table id='responses' className='wordscores'>
                    <tbody>
                        <tr><th colspan="2"> {'Round ' + this.state.round.substring(1)}</th></tr>
                        <tr><th> Word </th> <th> Points </th></tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>)
    }

}


export default ResponseManager;