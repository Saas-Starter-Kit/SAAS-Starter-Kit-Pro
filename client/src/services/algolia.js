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
  let title = node.data.title.text;

  let body = node.data.body[2];

  console.log(body);

  return {
    objectID: uid,
    ...tags,
    title,
    body
  };
};

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.allPrismicPost.edges.map(transformToAlgoliaRecord),
    indexName: 'ssk_test',
    settings: { attributesToSnippet: [`excerpt:30`] }
  }
];

module.exports = queries;
