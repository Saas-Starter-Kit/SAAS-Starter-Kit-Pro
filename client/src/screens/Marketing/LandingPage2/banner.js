import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import { PrimaryButton } from '../../../components/Common/buttons/PrimaryButton';
import { SecondaryButton } from '../../../components/Common/buttons/SecondaryButton';
import Particles from './particles';
import BannerObject1 from './images/bannerObjects/bannerObject1.png';
import BannerObject2 from './images/bannerObjects/bannerObject2.png';

const Wrapper = styled.section`
  padding-top: 12rem;
  padding-bottom: 5rem;
  margin-bottom: 5rem;
  position: relative;
  @media (max-width: ${breakpoints.large}) {
    padding-top: 180px;
    padding-bottom: 60px;
    min-height: auto;
  }
  @media (max-width: ${breakpoints.medium}) {
    padding-top: 130px;
    padding-bottom: 20px;
    min-height: auto;
  }
  @media only screen and (max-width: ${breakpoints.extraSmall}) {
    background: none;
  }
`;

const Container1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: none;
  padding-left: 2rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: 992px) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    max-width: 1170px;
    width: 100%;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  z-index: 1;
`;

const Container3 = styled.div`
  padding: 0 1rem;
  width: 100%;
  @media (min-width: ${breakpoints.small}) {
    width: 70%;
  }
  @media (min-width: ${breakpoints.medium}) {
    width: 50%;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 45%;
  }
`;

const Title = styled.h2`
  color: ${colors.firefly};
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: 1.75rem;
    font-size: 1.75rem;
  }
  @media (min-width: ${breakpoints.medium}) {
    font-size: 2rem;
    margin-top: -4rem;
  }
  @media (min-width: ${breakpoints.large}) {
    font-size: 3.25rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.75;
`;

const ButtonWrapper = styled.div`
  margin-top: 2.1rem;
  @media (max-width: ${breakpoints.medium}) {
    margin-bottom: 2rem;
  }
`;

const BannerImageContainer1 = styled.div`
  position: absolute;
  margin-top: 5rem;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  @media (max-width: ${breakpoints.large}) {
    margin-top: 4rem;
  }
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const BannerImageContainer2 = styled.div`
  margin-left: auto;
  position: relative;
`;

const DashboardWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ImageBackground = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const ImageOverlay = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  animation: ${fadeInLeft} 0.8s ease-in forwards;
`;

const Banner = () => (
  <Wrapper>
    <Particles />
    <Container1>
      <Container2>
        <Container3>
          <Title>Ultimate Platform to monitor your best workflow.</Title>
          <Description>
            We help to create SaaS product that are innovative, differentiated with a superb User
            Experience, fully accessible through mobile devices. SaaS products are changing the
            world.
          </Description>
          <ButtonWrapper>
            <PrimaryButton>FREE TRIAL</PrimaryButton>
            <SecondaryButton>EXPLORE MORE</SecondaryButton>
          </ButtonWrapper>
        </Container3>
      </Container2>
    </Container1>
    <BannerImageContainer1>
      <BannerImageContainer2>
        <ImageBackground src={BannerObject1} alt="BannerObject1" />
        <DashboardWrapper>
          <ImageOverlay src={BannerObject2} alt="BannerObject2" />
        </DashboardWrapper>
      </BannerImageContainer2>
    </BannerImageContainer1>
  </Wrapper>
);

export default Banner;
