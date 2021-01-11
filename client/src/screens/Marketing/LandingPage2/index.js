import React from 'react';
import NavBar from '../../../components/Marketing/LandingPage2/navBar';
import Banner from '../../../components/Marketing/LandingPage2/bannerSection';
import { LandingPage2GlobalStyle as GlobalStyle } from '../../../styles/theme';

const LandingPage2 = () => (
  <React.Fragment>
    <GlobalStyle />
    <NavBar />
    <Banner />
  </React.Fragment>
);

export default LandingPage2;
