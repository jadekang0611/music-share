import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  gql,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { GET_QUEUED_SONGS } from "./queries";

const httpLink = new HttpLink({
  uri: "https://on-firefly-85.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "LzODuRqK4UV61gr0O1nULEu0OIWvnRC9QDWeaCK5oXEnZp4ZdtZJKh86UBIkDRBY",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://on-firefly-85.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "LzODuRqK4UV61gr0O1nULEu0OIWvnRC9QDWeaCK5oXEnZp4ZdtZJKh86UBIkDRBY",
      },
    },
  })
);

// export default client;
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,

  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        });
        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });
          return newQueue;
        }
        return [];
      },
    },
  },
});

const data = { queue: [] };

export default client;
