import { PubSub } from "graphql-subscriptions";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { GraphQLError } from "graphql";

interface User {
  uid: string;
}

const pubsub = new PubSub();
const CLICK_UPDATED = "CLICK_UPDATED";

export const resolvers = {
  Query: {
    clicks: async () => {
      const querySnapshot = await getDocs(collection(db, "clicks"));
      return querySnapshot.docs.map((doc) => doc.data());
    },
  },
  Mutation: {
    incrementCount: async (
      _: any,
      __: any,
      { user }: { user: User | null }
    ) => {
      if (!user) {
        throw new GraphQLError("Not authenticated");
      }
      const click = {
        userId: user.uid,
        timestamp: new Date().toISOString(),
        count: 1,
      }; // count 로직 추가 필요
      await addDoc(collection(db, "clicks"), click);
      pubsub.publish(CLICK_UPDATED, { countUpdated: click });
      return click;
    },
  },
  Subscription: {
    countUpdated: {
      subscribe: () => pubsub.asyncIterator([CLICK_UPDATED]),
    },
  },
};
