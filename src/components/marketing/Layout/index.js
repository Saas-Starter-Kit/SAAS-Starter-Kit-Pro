import styled from 'styled-components';
import SEO from './seo';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
