import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

const SEO = ({ seoData: { title, description, image, article, pathname } }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
    siteUrl,
  } = siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname || "/"}`,
    article: article ? true : false,
  }

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en'
        }}
      >
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        <meta property="og:url" content={seo.url} />
        {article ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
      </Helmet>
    </>
  )
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle
        defaultDescription
        siteUrl
        defaultImage
      }
    }
  }
`

export default SEO
