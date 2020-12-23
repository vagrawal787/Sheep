/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      q1
      q2
      q3
      q4
      q5
      q6
      q7
      q8
      q9
      q10
      createdAt
      updatedAt
    }
  }
`;
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        q1
        q2
        q3
        q4
        q5
        q6
        q7
        q8
        q9
        q10
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResponse = /* GraphQL */ `
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
      id
      fname
      lname
      form_id
      email
      r1
      r2
      r3
      r4
      r5
      r6
      r7
      r8
      r9
      r10
      createdAt
      updatedAt
    }
  }
`;
export const listResponses = /* GraphQL */ `
  query ListResponses(
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fname
        lname
        form_id
        email
        r1
        r2
        r3
        r4
        r5
        r6
        r7
        r8
        r9
        r10
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
