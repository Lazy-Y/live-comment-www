import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(
    {
      typePolicies: {
        Query: {
          fields: {
            queryPosts: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: false,
              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing, incoming) {
                console.log(existing, incoming);
                let edges = existing?.edges ?? []
                edges = edges.concat(incoming.edges)
                const { nextAfterCursor } = incoming;
                return {
                  ...existing ?? {},
                  edges,
                  nextAfterCursor
                };
              },
            }
          }
        }
      }
    }
  ),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
