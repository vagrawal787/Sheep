/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm {
    onCreateForm {
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
        userID
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
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm {
    onUpdateForm {
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
        userID
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
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm {
    onDeleteForm {
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
        userID
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
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse {
    onCreateResponse {
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
export const onUpdateResponse = /* GraphQL */ `
  subscription OnUpdateResponse {
    onUpdateResponse {
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
export const onDeleteResponse = /* GraphQL */ `
  subscription OnDeleteResponse {
    onDeleteResponse {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
      id
      userID
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
      id
      userID
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
      id
      userID
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
