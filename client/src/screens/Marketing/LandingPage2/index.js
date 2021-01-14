import React from 'react';
import NavBar from './nav';
import Banner from './banner';
import Services from './services';
import HowItWorks from './howItWorks';
import { GlobalStyle } from './styles';

const LandingPage2 = () => (
  <React.Fragment>
    <GlobalStyle />
    <NavBar />
    <Banner />
    <Services />
    <HowItWorks />
  </React.Fragment>
);

export default LandingPage2;
