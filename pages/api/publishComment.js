import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function handler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation PublishComment($id: ID!) {
      publishComment(where: {id: $id}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    id: req.body.id,
  });

  return res.status(200).send(result);
}