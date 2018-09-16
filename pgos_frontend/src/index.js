import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// Apollo Client is just the client-side interace for a GraphQL API.
// apollo-boost adds a lot of built-in functionality, the big ones being:
// an in-memory cache system to cache queries, local state management,
// and a quick HTTP link setup for fetching remote data.

// * Our implementation is simple enough that GraphQL's in-memory caching,
// can effectively replace Redux (!) -- check out Apollo dev tools for Chrome
// to look under the hood.

const client = new ApolloClient({
  // Our Rails server GraphQL endpoint
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
