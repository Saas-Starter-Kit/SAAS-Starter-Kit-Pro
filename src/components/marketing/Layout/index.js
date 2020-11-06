import styled from 'styled-components';
import SEO from './seo';
import Header from '../Navigation/header';
import Footer from '../Navigation/footer';
import Headroom from 'react-headroom';

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <Headroom>
        <Header />
      </Headroom>

      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
