const queries = require('./src/utils/algoliaQuery');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    defaultTitle: `Gatsby SAAS Starter`,
    defaultDescription: `A starter for a minimal SAAS app`,
    siteUrl: `http://localhost:8000`,
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
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/auth/*`] }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/user/*`] }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/purchase/*`] }
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
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.GATSBY_DISQUS_SHORTNAME
      }
    }
  ]
};
