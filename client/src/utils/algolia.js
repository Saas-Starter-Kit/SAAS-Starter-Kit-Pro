const postQuery = `{
  allPrismicPost {
    edges {
      node {
        uid
        tags
        data {
          title {
            text
          }
          body {
            ... on PrismicPostBodyContent {
              id
              primary {
                content {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const transformToAlgoliaRecord = ({ node }) => {
  let uid = node.uid;
  let tags = node.tags;

  console.log(node.data);

  return {
    objectID: uid,
    ...tags
  };
};

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.allPrismicPost.edges.map(transformToAlgoliaRecord),
    indexName: 'ssk_test'
  }
];

module.exports = queries;
