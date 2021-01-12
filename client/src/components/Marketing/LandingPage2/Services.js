import React from 'react';
import styled from 'styled-components';
import '../../../assets/css/flaticon.css';
import {
  landingPage2Breakpoints as breakpoints,
  landingPage2Colors as colors
} from '../../../styles/theme';

const SERVICES = [
  {
    id: 1,
    icon: 'flaticon-creative',
    color1: 'rgba(236, 0, 140, 0.75)',
    color2: 'rgba(255, 103, 103, 0.75)',
    title: 'Powerful Features',
    description:
      'Automate time consuming tasks like organising expenses, tracking your time and following up with clients'
  },
  {
    id: 2,
    icon: 'flaticon-briefing',
    color1: 'rgba(110, 72, 170, 0.75)',
    color2: 'rgba(192, 91, 210, 0.75)',
    title: 'Easy Invoicing',
    description:
      'Want to surprise your clients with professional-looking invoices? Then you are some clicks behind.'
  },
  {
    id: 3,
    icon: 'flaticon-flask',
    color1: 'rgba(241, 39, 17, 0.7)',
    color2: 'rgba(245, 175, 25, 0.7)',
    title: 'Easy To Use',
    description:
      'Very Simple and intuitive. So you have to spend less time on paperwork and impress your customer with looks.'
  }
];

const Container1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.large}) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: 1220px) {
    max-width: 1170px;
    width: 100%;
  }
  padding: 80px 30px 180px;
  @media (max-width: ${breakpoints.medium}) {
    padding: 60px 30px 30px;
  }
  @media (max-width: ${breakpoints.large}) {
    padding: 60px 30px 60px;
  }
`;

const Container2 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.large}) {
    margin-bottom: 80px;
  }
`;

const Label = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.15em;
  font-weight: 700;
  color: ${colors.royalBlue};
  margin-bottom: 10px;
`;

const Title = styled.h2`
  text-align: center;
  line-height: 28px;
  font-size: 20px;
  @media (min-width: ${breakpoints.small}) {
    font-size: 24px;
  }
  font-weight: 500;
  color: ${colors.firefly};
  letter-spacing: -0.025em;
  margin-bottom: 0px;
`;

const ServiceWrapper = styled.div`
  width: 100%;
  @media (min-width: ${breakpoints.small}) {
    width: 50%;
  }
  @media (min-width: ${breakpoints.medium}) {
    width: 33.33%;
  }
  padding: 20px;
  &.icon_left {
    display: flex;
  }
  &.icon_right {
    display: flex;
    flex-direction: row-reverse;
    .content__wrapper {
      text-align: right;
    }
  }
`;

const IconWrapper = styled.div`
  background: linear-gradient(-60deg, ${({ color1 }) => color1}, ${({ color2 }) => color2});
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  @media (min-width: ${breakpoints.medium}) {
    width: 75px;
    height: 75px;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    width: 84px;
    height: 84px;
  }
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 36px;
  }
  overflow: hidden;
  margin-bottom: 20px;
  @media (min-width: ${breakpoints.extraLarge}) {
    margin-bottom: 30px;
  }
  position: relative;
  border-bottom-left-radius: 6px;
  .flaticon-flask {
    &:before {
      margin-left: 8px;
    }
  }
  &:before,
  &:after {
    content: '';
    width: 28px;
    height: calc(100% + 30px);
    position: absolute;
  }
  &:before {
    transform: rotate(45deg);
    background-color: rgba(255, 255, 255, 0.15);
  }
  &:after {
    transform: rotate(-45deg);
    background-color: rgba(0, 0, 0, 0.05);
  }
  text-align: left;
`;

const Header = styled.h2`
  font-weight: 400;
  color: ${colors.firefly};
  line-height: 1.5;
  font-size: 18px;
  @media (min-width: ${breakpoints.small}) {
    font-size: 20px;
  }
  margin-top: 2rem;
  margin-bottom: 10px;
  @media (min-width: ${breakpoints.extraLarge}) {
    margin-bottom: 20px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${colors.brightGray};
`;

const Services = () => (
  <Container1>
    <TitleWrapper>
      <Label>OUR SERVICES</Label>
      <Title>Featured Service that We Provide</Title>
    </TitleWrapper>
    <Container2>
      {SERVICES.map(({ id, icon, color1, color2, title, description }) => (
        <ServiceWrapper key={id}>
          <IconWrapper color1={color1} color2={color2}>
            <i className={icon} />
          </IconWrapper>
          <Header>{title}</Header>
          <Description>{description}</Description>
        </ServiceWrapper>
      ))}
    </Container2>
  </Container1>
);

export default Services;
