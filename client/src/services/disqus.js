import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

const DisqusConfig = ({ url, identifier, title }) => {
  const config = {
    url,
    identifier,
    title
  };

  return <Disqus config={config} />;
};

export default DisqusConfig;
