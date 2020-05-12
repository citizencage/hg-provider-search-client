import Vue from 'vue';
window.Vue = Vue;
export const EventBus = new Vue();

Vue.config.productionTip = false;

import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

const httpLink = createHttpLink({
   uri: 'https://hg-provider-server-demo.herokuapp.com/graphql',
});

// Cache implementation
const cache = new InMemoryCache({
    addTypename: true
});

// Create the apollo client
const client = new ApolloClient({
    link: httpLink,
    cache,
});


export const apolloProvider = new VueApollo({
    defaultClient: client
});
