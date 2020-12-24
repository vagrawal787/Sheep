import React, { Component } from 'react';

import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../aws-exports';
import gql from 'graphql-tag';

import Input from '../components/Input';
import Button from '../components/Button';

import ThankFormCreate from '../pages/thankYouForm';

class CreatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
            id: '',
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: '',
            redirect: false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({ [name]: value });
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const createF = {
            id: this.state.id,
            userID: this.state.userID,
            q1: this.state.q1,
            q2: this.state.q2,
            q3: this.state.q3,
            q4: this.state.q4,
            q5: this.state.q5,
            q6: this.state.q6,
            q7: this.state.q7,
            q8: this.state.q8,
            q9: this.state.q9,
            q10: this.state.q10,
        }
        const client = new AWSAppSyncClient({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            disableOffline: true,
            auth: {
                type: AUTH_TYPE.API_KEY,
                apiKey: awsconfig.aws_appsync_apiKey,
            },
        });
        const newGame = await client.mutate({ mutation: gql(mutations.createForm), variables: { input: createF } });
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            this.state.redirect = false;
            return <ThankFormCreate code={this.state.id}/>
        }
        return (
            <div>
                <h1> Create a Game! </h1>
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                {/* <Input inputType={'text'}
          title={'Name:'}
          name={'fname'}
          value={this.state.fname}
          placeholder={'First name'}
          handleChange={this.handleInput}

        />  */}


                <Input inputType={'number'}
                    title={'ID:'}
                    name={'id'}
                    value={this.state.id}
                    placeholder={'ID'}
                    handleChange={this.handleInput}

                /> {/* id */}

                <Input inputType={'text'}
                    title={'Question 1:'}
                    name={'q1'}
                    value={this.state.q1}
                    placeholder={'Question 1'}
                    handleChange={this.handleInput}

                /> {/* Question 1 */}

                <Input inputType={'text'}
                    title={'Question 2:'}
                    name={'q2'}
                    value={this.state.q2}
                    placeholder={'Question 2'}
                    handleChange={this.handleInput}

                /> {/* Question 2 */}

                <Input inputType={'text'}
                    title={'Question 3:'}
                    name={'q3'}
                    value={this.state.q3}
                    placeholder={'Question 3'}
                    handleChange={this.handleInput}

                /> {/* Question 3 */}

                <Input inputType={'text'}
                    title={'Question 4:'}
                    name={'q4'}
                    value={this.state.q4}
                    placeholder={'Question 4'}
                    handleChange={this.handleInput}

                /> {/* Question 4 */}

                <Input inputType={'text'}
                    title={'Question 5:'}
                    name={'q5'}
                    value={this.state.q5}
                    placeholder={'Question 5'}
                    handleChange={this.handleInput}

                /> {/* Question 5 */}

                <Input inputType={'text'}
                    title={'Question 6:'}
                    name={'q6'}
                    value={this.state.q6}
                    placeholder={'Question 6'}
                    handleChange={this.handleInput}

                /> {/* Question 6 */}

                <Input inputType={'text'}
                    title={'Question 7:'}
                    name={'q7'}
                    value={this.state.q7}
                    placeholder={'Question 7'}
                    handleChange={this.handleInput}

                /> {/* Question 7 */}

                <Input inputType={'text'}
                    title={'Question 8:'}
                    name={'q8'}
                    value={this.state.q8}
                    placeholder={'Question 8'}
                    handleChange={this.handleInput}

                /> {/* Question 8 */}

                <Input inputType={'text'}
                    title={'Question 9:'}
                    name={'q9'}
                    value={this.state.q9}
                    placeholder={'Question 9'}
                    handleChange={this.handleInput}

                /> {/* Question 9 */}

                <Input inputType={'text'}
                    title={'Question 10:'}
                    name={'q10'}
                    value={this.state.q10}
                    placeholder={'Question 10'}
                    handleChange={this.handleInput}

                /> {/* Question 10 */}

                <Button
                    action={this.handleFormSubmit}
                    type={'primary'}
                    title={'Submit'}
                /> { /*Submit */}

            </form>
            </div>
        );
    }
}

export default CreatePage;