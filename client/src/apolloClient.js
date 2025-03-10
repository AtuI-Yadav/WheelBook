import { cacheExchange, createClient, fetchExchange } from "urql";

const client = createClient({
    url: "http://localhost:3000/graphql",
    exchanges: [cacheExchange, fetchExchange],
});

export default client;
