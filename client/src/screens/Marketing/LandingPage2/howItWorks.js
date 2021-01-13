import React from 'react';
import styled from 'styled-components';
import {
  landingPage2Breakpoints as breakpoints,
  landingPage2Colors as colors
} from '../../../styles/theme';
import Background from '../../../assets/images/LandingPage2/howItWorks/background.png';
import MainImage from '../../../assets/images/LandingPage2/howItWorks/mainImage.png';
import { PrimaryButton } from '../../../components/Common/buttons/PrimaryButton';

const Container = styled.section`
  min-height: 630px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  @media (max-width: ${breakpoints.medium}) {
    min-height: auto;
    display: block;
  }
  @media only screen and (max-width: ${breakpoints.large}) {
    min-height: 370px;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 1200px) {
    min-height: 500px;
    margin-bottom: 45px;
  }
`;

const ImagesContainer = styled.div`
  position: absolute;
  width: 55%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
    position: relative;
    height: auto;
    top: auto;
    left: auto;
  }
  img {
    max-width: 93%;
    height: auto;
  }
  .objectWrapper {
    margin-right: auto;
    position: relative;
    .dashboardWrapper {
      position: absolute;
      top: 4vw;
      left: 0;
    }
  }
`;

const BackgroundContainer = styled.div`
  margin-right: auto;
  position: relative;
`;

const MainImageContainer = styled.div`
  position: absolute;
  top: 4vw;
  left: 0;
  max-width: 93%;
  height: auto;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const ContentContainer1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.large}) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    max-width: 1170px;
    width: 100%;
  }
`;

const ContentContainer2 = styled.div`
  @media (min-width: ${breakpoints.small}) {
    width: 100%;
    margin-left: 0px;
  }
  @media (min-width: ${breakpoints.medium}) {
    width: 45%;
    margin-left: 58%;
  }
`;

const Header = styled.h2`
  font-size: 20px;
  max-width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 26px;
  }
  @media (min-width: ${breakpoints.large}) {
    font-size: 36px;
    max-width: 440px;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    font-size: 48px;
  }
  font-weight: 400;
  color: ${colors.firefly};
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.brightGray};
  line-height: 1.75;
  margin-bottom: 33px;
  max-width: 100%;
  @media (min-width: ${breakpoints.large}) {
    max-width: 440px;
  }
`;

const HowItWorks = () => (
  <Container>
    <ImagesContainer>
      <BackgroundContainer>
        <Image src={Background} />
      </BackgroundContainer>
      <MainImageContainer>
        <Image src={MainImage} />
      </MainImageContainer>
    </ImagesContainer>
    <ContentContainer1>
      <ContentContainer2>
        <Header>Make your website growth with next level visitors</Header>
        <Description>
          For Enhanced performance we use LiteSpeed Web Server, HTTP/2, PHP7. We make your website
          faster, which will help you to increase search ranking!
        </Description>
        <PrimaryButton>HOW IT WORKS</PrimaryButton>
      </ContentContainer2>
    </ContentContainer1>
  </Container>
);

export default HowItWorks;
