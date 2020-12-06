import Head from 'next/head';
import config from '../../utils/SEOConfig';

export default function SEO() {
  const siteTitle = config.title;
  const siteDescription = config.title;

  return (
    <Head>
      {/*<title>{`${title} | ${siteTitle}`}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteTitle} />
      <meta property='twitter:card' content='summary' />
      <meta property='twitter:creator' content={config.social.twitter} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />*/}
    </Head>
  );
}
