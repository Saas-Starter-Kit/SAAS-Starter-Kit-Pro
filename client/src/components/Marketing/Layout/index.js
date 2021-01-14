import React from 'react';
import SEO from './seo';
import Header from '../Navigation/header';
import Footer from '../Navigation/footer';
import Headroom from 'react-headroom';

const Layout = ({ title, description, children }) => {
  const seoData = {
    title,
    description
  };

  return (
    <>
      <SEO seoData={seoData} />
      <Headroom>
        <Header />
      </Headroom>

      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
