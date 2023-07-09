import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const withApollo = (App) => () => {

    const client = new ApolloClient({
        uri: '/v1/graphql',
        cache: new InMemoryCache(),
      });


      return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
      )

}


export default withApollo; 