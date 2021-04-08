const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;


  const docs = await graphql(`
    {
      allPrismicDocs {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  if (docs.errors) {
    reporter.panic(docs.errors);
  }

  const templateDocs = path.resolve('src/templates/docs.js');

  docs.data.allPrismicDocs.edges.forEach((edge) => {
    createPage({
      path: `/docs/${edge.node.uid}`,
      component: templateDocs,
      context: {
        uid: edge.node.uid
      }
    });
  });
};
