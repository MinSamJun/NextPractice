import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Click {
    id: ID!
    userId: ID!
    timestamp: String!
    count: Int!
  }

  type Query {
    clicks: [Click!]!
  }

  type Mutation {
    incrementCount: Click
  }

  type Subscription {
    countUpdated: Click
  }
`;
