/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      userID
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
      user {
        id
        forms {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        userID
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
        user {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResponses = /* GraphQL */ `
  query GetResponses($formID: ID!, $email: String!) {
    getResponses(formID: $formID, email: $email) {
      id
      fname
      lname
      formID
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
export const listResponsess = /* GraphQL */ `
  query ListResponsess(
    $formID: ID
    $email: ModelStringKeyConditionInput
    $filter: ModelResponsesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listResponsess(
      formID: $formID
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        fname
        lname
        formID
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
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      forms {
        items {
          id
          userID
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
      createdAt
      updatedAt
    }
  }
`;
export const listUserss = /* GraphQL */ `
  query ListUserss(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        forms {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResponseCleaned = /* GraphQL */ `
  query GetResponseCleaned($formID: String!, $email: String!) {
    getResponseCleaned(formID: $formID, email: $email) {
      formID
      email
      fname
      lname
      id
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
export const listResponseCleaneds = /* GraphQL */ `
  query ListResponseCleaneds(
    $formID: String
    $email: ModelStringKeyConditionInput
    $filter: ModelResponseCleanedFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listResponseCleaneds(
      formID: $formID
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        formID
        email
        fname
        lname
        id
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
export const getWordScore = /* GraphQL */ `
  query GetWordScore($formID: String!, $round: String!) {
    getWordScore(formID: $formID, round: $round) {
      formID
      round
      scores
      createdAt
      updatedAt
    }
  }
`;
export const listWordScores = /* GraphQL */ `
  query ListWordScores(
    $formID: String
    $round: ModelStringKeyConditionInput
    $filter: ModelWordScoreFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWordScores(
      formID: $formID
      round: $round
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        formID
        round
        scores
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
