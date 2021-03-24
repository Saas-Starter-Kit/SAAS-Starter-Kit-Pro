const queries = require('./src/utils/algoliaQuery');
require('dotenv').config();

//disable sentry for development
const sentryDSN = process.env.NODE_ENV == 'development' ? '' : process.env.GATSBY_SENTRY_DNS;

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
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100
        }
      }
    },
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_ID]
      }
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        schemas: {
          post: require('./.prismic/post.json'),
          docs: require('./.prismic/docs.json')
        }
      }
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: sentryDSN,
        sampleRate: 1
      }
    },
    //{
    //  resolve: `gatsby-plugin-algolia`,
    //  options: {
    //    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //    apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
    //    queries
    //  }
    //},
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.GATSBY_DISQUS_SHORTNAME
      }
    }
  ]
};
