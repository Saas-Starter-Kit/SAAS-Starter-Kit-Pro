import React from 'react';
import Helmet from 'react-helmet';
import siteMetadata from '../../../utils/siteMetadata';

const SEO = ({ seoData: { title, description, image, article, pathname } }) => {
  const { defaultTitle, defaultDescription, defaultImage, siteUrl } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname || '/'}`,
    article: article ? true : false
  };

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
  );
};

export default SEO;
