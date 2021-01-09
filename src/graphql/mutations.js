/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
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
export const updateForm = /* GraphQL */ `
  mutation UpdateForm(
    $input: UpdateFormInput!
    $condition: ModelFormConditionInput
  ) {
    updateForm(input: $input, condition: $condition) {
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
export const deleteForm = /* GraphQL */ `
  mutation DeleteForm(
    $input: DeleteFormInput!
    $condition: ModelFormConditionInput
  ) {
    deleteForm(input: $input, condition: $condition) {
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
export const createResponses = /* GraphQL */ `
  mutation CreateResponses(
    $input: CreateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    createResponses(input: $input, condition: $condition) {
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
export const updateResponses = /* GraphQL */ `
  mutation UpdateResponses(
    $input: UpdateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    updateResponses(input: $input, condition: $condition) {
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
export const deleteResponses = /* GraphQL */ `
  mutation DeleteResponses(
    $input: DeleteResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    deleteResponses(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createResponseCleaned = /* GraphQL */ `
  mutation CreateResponseCleaned(
    $input: CreateResponseCleanedInput!
    $condition: ModelResponseCleanedConditionInput
  ) {
    createResponseCleaned(input: $input, condition: $condition) {
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
export const updateResponseCleaned = /* GraphQL */ `
  mutation UpdateResponseCleaned(
    $input: UpdateResponseCleanedInput!
    $condition: ModelResponseCleanedConditionInput
  ) {
    updateResponseCleaned(input: $input, condition: $condition) {
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
export const deleteResponseCleaned = /* GraphQL */ `
  mutation DeleteResponseCleaned(
    $input: DeleteResponseCleanedInput!
    $condition: ModelResponseCleanedConditionInput
  ) {
    deleteResponseCleaned(input: $input, condition: $condition) {
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
export const createWordScore = /* GraphQL */ `
  mutation CreateWordScore(
    $input: CreateWordScoreInput!
    $condition: ModelWordScoreConditionInput
  ) {
    createWordScore(input: $input, condition: $condition) {
      formID
      round
      scores
      user_scores
      createdAt
      updatedAt
    }
  }
`;
export const updateWordScore = /* GraphQL */ `
  mutation UpdateWordScore(
    $input: UpdateWordScoreInput!
    $condition: ModelWordScoreConditionInput
  ) {
    updateWordScore(input: $input, condition: $condition) {
      formID
      round
      scores
      user_scores
      createdAt
      updatedAt
    }
  }
`;
export const deleteWordScore = /* GraphQL */ `
  mutation DeleteWordScore(
    $input: DeleteWordScoreInput!
    $condition: ModelWordScoreConditionInput
  ) {
    deleteWordScore(input: $input, condition: $condition) {
      formID
      round
      scores
      user_scores
      createdAt
      updatedAt
    }
  }
`;
export const createUserScore = /* GraphQL */ `
  mutation CreateUserScore(
    $input: CreateUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    createUserScore(input: $input, condition: $condition) {
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
export const updateUserScore = /* GraphQL */ `
  mutation UpdateUserScore(
    $input: UpdateUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    updateUserScore(input: $input, condition: $condition) {
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
export const deleteUserScore = /* GraphQL */ `
  mutation DeleteUserScore(
    $input: DeleteUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    deleteUserScore(input: $input, condition: $condition) {
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
export const createFormResponseList = /* GraphQL */ `
  mutation CreateFormResponseList(
    $input: CreateFormResponseListInput!
    $condition: ModelFormResponseListConditionInput
  ) {
    createFormResponseList(input: $input, condition: $condition) {
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
export const updateFormResponseList = /* GraphQL */ `
  mutation UpdateFormResponseList(
    $input: UpdateFormResponseListInput!
    $condition: ModelFormResponseListConditionInput
  ) {
    updateFormResponseList(input: $input, condition: $condition) {
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
export const deleteFormResponseList = /* GraphQL */ `
  mutation DeleteFormResponseList(
    $input: DeleteFormResponseListInput!
    $condition: ModelFormResponseListConditionInput
  ) {
    deleteFormResponseList(input: $input, condition: $condition) {
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
