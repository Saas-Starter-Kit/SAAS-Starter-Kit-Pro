import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '../../../styles/theme';
import {
  FcDoughnutChart,
  FcCurrencyExchange,
  FcBullish,
  FcInvite,
  FcSerialTasks,
  FcTimeline
} from 'react-icons/fc';

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 20;
  margin-top: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1.5px black solid;
  background-color: ${colors.white};
  padding: 1.5rem 1.25rem;
  min-width: 28rem;
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0.4rem 0 0.4rem 0;
  padding: 0.2rem;

  &:hover {
    background-color: ${colors.gray50};
  }
`;

const MenuImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.375rem;
  background-color: ${colors.indigo500};
  color: ${colors.white};
`;

const TextWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${colors.gray500};
`;

const StyledIconBullish = styled(FcBullish)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledIconInvite = styled(FcInvite)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledIconTasks = styled(FcSerialTasks)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledTimeline = styled(FcTimeline)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledPrice = styled(FcCurrencyExchange)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledChart = styled(FcDoughnutChart)`
  width: 4rem;
  height: 4rem;
  padding-left: 0.5rem;
`;

const StyledHr = styled.hr`
  height: 2px;
  width: 100%;
  background-color: black;
  margin: 0.5rem 0 0.5rem 0;
`;

const FlyoutMenu = () => (
  <Container>
    <Link href="/pricing">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledPrice />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>Pricing</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur </Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
    <Link href="/app/1/dashboard">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledChart />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>App</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur </Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
    <StyledHr />
    <Link href="/product/page1">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledIconBullish />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>Core Feature 1</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur </Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
    <Link href="/product/page2">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledIconInvite />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>Core Feature 2</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur </Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
    <Link href="/product/page3">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledIconTasks />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>Core Feature 3</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur </Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
    <Link href="/product/page4">
      <a>
        <Item>
          <MenuImageWrapper>
            <StyledTimeline />
          </MenuImageWrapper>
          <TextWrapper>
            <Title>Core Feature 4</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur</Description>
          </TextWrapper>
        </Item>
      </a>
    </Link>
  </Container>
);

export default FlyoutMenu;
