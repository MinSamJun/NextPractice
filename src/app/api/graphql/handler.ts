import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "apollo-server-micro";
import { typeDefs } from "../../../graphql/typeDefs";
import { resolvers } from "../../../graphql/resolvers";
import { NextApiRequest, NextApiResponse } from "next";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });

const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
