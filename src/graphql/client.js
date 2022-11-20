import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://on-firefly-85.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      'LzODuRqK4UV61gr0O1nULEu0OIWvnRC9QDWeaCK5oXEnZp4ZdtZJKh86UBIkDRBY',
  },
});

export default client;
