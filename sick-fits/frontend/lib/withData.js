// import withApollo from "next-with-apollo";
// // import ApolloClient  from 'apollo-boost';
// // import ApolloClient, { InMemoryCache } from "apollo-boost";

// // import ApolloClient from "@apollo/client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// import { endpoint } from "../config";

// function createClient({ headers, initialState }) {
//   return new ApolloClient({
//     uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
//    cache: new InMemoryCache(),
//     // request: (operation) => {
//     //   operation.setContext({
//     //     fetchOptions: {
//     //       credentials: "include",
//     //     },
//     //     headers,
//     //   });
//     // },
//   });
// }

// export default withApollo(createClient);


import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
 import { endpoint } from "../config";

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: process.env.NODE_ENV === "development" ? endpoint : endpoint, // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}