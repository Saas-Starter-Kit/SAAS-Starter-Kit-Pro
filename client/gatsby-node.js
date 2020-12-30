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

  if (pages.errors) {
    reporter.panic(pages.errors);
  }

  const templatePost = path.resolve('src/templates/post.js');
  console.log(pages);
  pages.data.allPrismicPost.edges.forEach((edge) => {
    createPage({
      path: `/blog/${edge.node.uid}`,
      component: templatePost,
      context: {
        uid: edge.node.uid
      }
    });
  });

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
  console.log(pages);
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
