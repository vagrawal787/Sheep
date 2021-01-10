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
      active
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
      active
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
      active
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
          active
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
          active
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
          active
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
      user_scores
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
      user_scores
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
      user_scores
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserScore = /* GraphQL */ `
  subscription OnCreateUserScore {
    onCreateUserScore {
      formID
      email
      fname
      lname
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
      r1_sum
      r2_sum
      r3_sum
      r4_sum
      r5_sum
      r6_sum
      r7_sum
      r8_sum
      r9_sum
      r10_sum
      createdAt
      updatedAt
      formResponseList {
        id
        forms {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateUserScore = /* GraphQL */ `
  subscription OnUpdateUserScore {
    onUpdateUserScore {
      formID
      email
      fname
      lname
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
      r1_sum
      r2_sum
      r3_sum
      r4_sum
      r5_sum
      r6_sum
      r7_sum
      r8_sum
      r9_sum
      r10_sum
      createdAt
      updatedAt
      formResponseList {
        id
        forms {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteUserScore = /* GraphQL */ `
  subscription OnDeleteUserScore {
    onDeleteUserScore {
      formID
      email
      fname
      lname
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
      r1_sum
      r2_sum
      r3_sum
      r4_sum
      r5_sum
      r6_sum
      r7_sum
      r8_sum
      r9_sum
      r10_sum
      createdAt
      updatedAt
      formResponseList {
        id
        forms {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateFormResponseList = /* GraphQL */ `
  subscription OnCreateFormResponseList {
    onCreateFormResponseList {
      id
      forms {
        items {
          formID
          email
          fname
          lname
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
          r1_sum
          r2_sum
          r3_sum
          r4_sum
          r5_sum
          r6_sum
          r7_sum
          r8_sum
          r9_sum
          r10_sum
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
export const onUpdateFormResponseList = /* GraphQL */ `
  subscription OnUpdateFormResponseList {
    onUpdateFormResponseList {
      id
      forms {
        items {
          formID
          email
          fname
          lname
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
          r1_sum
          r2_sum
          r3_sum
          r4_sum
          r5_sum
          r6_sum
          r7_sum
          r8_sum
          r9_sum
          r10_sum
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
export const onDeleteFormResponseList = /* GraphQL */ `
  subscription OnDeleteFormResponseList {
    onDeleteFormResponseList {
      id
      forms {
        items {
          formID
          email
          fname
          lname
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
          r1_sum
          r2_sum
          r3_sum
          r4_sum
          r5_sum
          r6_sum
          r7_sum
          r8_sum
          r9_sum
          r10_sum
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
