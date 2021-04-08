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
          post: require('./.prismic/post.json')
        }
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
