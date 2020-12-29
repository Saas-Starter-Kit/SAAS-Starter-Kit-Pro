const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  const template = path.resolve('src/templates/post.js');
  console.log(pages);
  pages.data.allPrismicPost.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.uid}`,
      component: template,
      context: {
        uid: edge.node.uid
      }
    });
  });
};
