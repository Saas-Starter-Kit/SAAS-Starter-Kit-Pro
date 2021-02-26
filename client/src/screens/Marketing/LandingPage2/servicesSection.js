import React from 'react';
import styled from 'styled-components';
import './assets/css/flaticon.css';
import { breakpoints, colors } from '../../../styles/theme';
import { FcCandleSticks } from 'react-icons/fc';

const SERVICES = [
  {
    id: 1,
    icon: FcCandleSticks,
    color1: 'rgba(236, 0, 140, 0.75)',
    color2: 'rgba(255, 103, 103, 0.75)',
    title: 'Powerful Features',
    description:
      'Automate time consuming tasks like organising expenses, tracking your time and following up with clients'
  },
  {
    id: 2,
    icon: FcCandleSticks,
    color1: 'rgba(110, 72, 170, 0.75)',
    color2: 'rgba(192, 91, 210, 0.75)',
    title: 'Easy Invoicing',
    description:
      'Want to surprise your clients with professional-looking invoices? Then you are some clicks behind.'
  },
  {
    id: 3,
    icon: FcCandleSticks,
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
  @media (min-width: ${breakpoints.extraLarge}) {
    max-width: 1170px;
    width: 100%;
  }
  padding: 5rem 2rem 10rem;
  @media (max-width: ${breakpoints.medium}) {
    padding: 4rem 2rem 2rem;
  }
  @media (max-width: ${breakpoints.large}) {
    padding: 4rem 2rem 4rem;
  }
`;

const Container2 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  margin-bottom: 3rem;
  @media (min-width: ${breakpoints.large}) {
    margin-bottom: 5rem;
  }
`;

const Label = styled.span`
  display: block;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  color: ${colors.royalBlue};
  margin-bottom: 0.6rem;
`;

const Title = styled.h2`
  text-align: center;
  line-height: 1.7rem;
  font-size: 1.4rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 2rem;
  }
  font-weight: 500;
  color: ${colors.firefly};
  letter-spacing: -0.025em;
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
  width: 5rem;
  height: 5rem;
  @media (min-width: ${breakpoints.medium}) {
    width: 5rem;
    height: 5rem;
  }
  @media (min-width: ${breakpoints.xxl}) {
    width: 5.5rem;
    height: 5.5rem;
  }
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  @media (min-width: ${breakpoints.medium}) {
    font-size: 2.1rem;
  }
  overflow: hidden;
  margin-bottom: 1.4rem;
  @media (min-width: ${breakpoints.xxl}) {
    margin-bottom: 2rem;
  }
  position: relative;
  border-bottom-left-radius: 0.4rem;
  .flaticon-flask {
    &:before {
      margin-left: 0.6rem;
    }
  }
  &:before,
  &:after {
    content: '';
    width: 1.8rem;
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
  font-size: 1.025rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 1.6rem;
  }
  margin-top: 2rem;
  margin-bottom: 0.7rem;
  @media (min-width: ${breakpoints.xxl}) {
    margin-bottom: 1.4rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
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
            {icon()}
          </IconWrapper>
          <Header>{title}</Header>
          <Description>{description}</Description>
        </ServiceWrapper>
      ))}
    </Container2>
  </Container1>
);

export default Services;
