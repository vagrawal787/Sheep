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
export const onCreateResponses = /* GraphQL */ `
  subscription OnCreateResponses {
    onCreateResponses {
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
export const onUpdateResponses = /* GraphQL */ `
  subscription OnUpdateResponses {
    onUpdateResponses {
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
export const onDeleteResponses = /* GraphQL */ `
  subscription OnDeleteResponses {
    onDeleteResponses {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
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
export const onCreateResponseCleaned = /* GraphQL */ `
  subscription OnCreateResponseCleaned {
    onCreateResponseCleaned {
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
export const onUpdateResponseCleaned = /* GraphQL */ `
  subscription OnUpdateResponseCleaned {
    onUpdateResponseCleaned {
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
export const onDeleteResponseCleaned = /* GraphQL */ `
  subscription OnDeleteResponseCleaned {
    onDeleteResponseCleaned {
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
export const onCreateWordScore = /* GraphQL */ `
  subscription OnCreateWordScore {
    onCreateWordScore {
      formID
      round
      scores
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWordScore = /* GraphQL */ `
  subscription OnUpdateWordScore {
    onUpdateWordScore {
      formID
      round
      scores
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWordScore = /* GraphQL */ `
  subscription OnDeleteWordScore {
    onDeleteWordScore {
      formID
      round
      scores
      createdAt
      updatedAt
    }
  }
`;
