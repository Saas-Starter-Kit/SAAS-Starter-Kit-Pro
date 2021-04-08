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
      resolve: '@sentry/gatsby',
      options: {
        dsn: sentryDSN,
        sampleRate: 1
      }
    }
  ]
};
