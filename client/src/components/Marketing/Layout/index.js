import React from 'react';
import Headroom from 'react-headroom';
import SEO from './seo';
import Header from '../Navigation/header';
import Footer from '../Navigation/footer';

const Layout = ({ children }) => {
  const seoData = {
    title: 'Saas Starter Kit Home page',
    description: 'Saas Starter Kit is a modern and comprehensive SAAS boilerplate.'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Headroom>
        <Header />
      </Headroom>
      <div>{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
