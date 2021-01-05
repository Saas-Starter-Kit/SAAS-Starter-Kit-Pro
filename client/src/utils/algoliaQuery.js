const docsQuery = `{
  allPrismicDocs {
    edges {
      node {
        uid
        data {
          title {
            text
          }
          body {
            ... on PrismicDocsBodyContent {
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
  let title = node.data.title.text;

  // This is to handle empty objects that are returned by the query
  let contentItems = [];
  const addContentItemstoArray = (item) => {
    if (item.id) {
      contentItems.push(item.primary.content.text);
    }
  };

  let content = node.data.body;
  content.map((item) => addContentItemstoArray(item));

  return {
    objectID: uid,
    title,
    contentItems
  };
};

const queries = [
  {
    query: docsQuery,
    transformer: ({ data }) => data.allPrismicDocs.edges.map(transformToAlgoliaRecord),
    indexName: 'ssk_test',
    settings: { attributesToSnippet: [`excerpt:30`] }
  }
];

module.exports = queries;
