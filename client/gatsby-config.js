require('dotenv').config();

module.exports = {
  siteMetadata: {
    defaultTitle: `Gatsby SAAS Starter`,
    defaultDescription: `A starter for a minimal SAAS app`,
    siteUrl: `https://example.com`,
    defaultImage: './src/images/favicon.ico'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] }
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `test1qwer`,
        schemas: {
          post: require('./.prismic/post.json'),
          docs: require('./.prismic/docs.json')
        }
      }
    }
  ]
};
