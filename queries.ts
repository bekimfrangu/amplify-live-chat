/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      body {
        companyName
        messages {
          message
          time
        }
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        body {
          companyName
          messages {
            message
            time
          }
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
