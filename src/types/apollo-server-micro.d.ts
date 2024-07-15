declare module "apollo-server-micro" {
  import {
    ApolloServer,
    gql,
    IResolvers,
    makeExecutableSchema,
  } from "apollo-server";

  export { ApolloServer, gql, IResolvers, makeExecutableSchema };
}
