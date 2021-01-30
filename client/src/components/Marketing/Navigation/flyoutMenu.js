import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors, breakpoints, transform } from '../../../styles/theme';
import ChartBar from '../../../assets/images/icons/chart-bar.svg';
import CursorClick from '../../../assets/images/icons/cursor-click.svg';
import ShieldCheck from '../../../assets/images/icons/shield-check.svg';
import ViewGrid from '../../../assets/images/icons/view-grid.svg';

const Container1 = styled.div`
  position: absolute;
  margin-left: -1rem;
  margin-top: 0.75rem;
  ${transform}
  width: max-content;
  max-width: 28rem;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 48rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-left: 0;
    left: 50%;
    --transform-translate-x: -50%;
  }
`;

const Container2 = styled.div`
  border-radius: 0.5rem;
`;

const Container3 = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Container4 = styled.div`
  z-index: 20;
  position: relative;
  display: grid;
  grid-gap: 1.5rem;
  gap: 1.5rem;
  background-color: ${colors.white};
  padding: 1.5rem 1.25rem;
  @media (min-width: ${breakpoints.small}) {
    grid-gap: 2rem;
    gap: 2rem;
    padding: 2rem;
  }
  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
`;

const Item = styled.div`
  margin: -0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${colors.gray50};
  }
`;

const MenuImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.375rem;
  background-color: ${colors.indigo500};
  color: ${colors.white};
  @media (min-width: ${breakpoints.small}) {
    height: 3rem;
    width: 3rem;
  }
`;

const TextWrapper = styled.div`
  margin-top: 0.25rem;
  margin-left: 1rem;
`;

const Title = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray500};
`;

const FlyoutMenu = () => (
  <Container1>
    <Container2>
      <Container3>
        <Container4>
          <Link href="#">
            <Item>
              <MenuImageWrapper>
                <MenuImg src={ChartBar} alt="chart bar" />
              </MenuImageWrapper>
              <TextWrapper>
                <Title>Analytics</Title>
                <Description>
                  Get a better understanding of where your traffic is coming from.
                </Description>
              </TextWrapper>
            </Item>
          </Link>
          <Link href="#">
            <Item>
              <MenuImageWrapper>
                <MenuImg src={CursorClick} alt="click" />
              </MenuImageWrapper>
              <TextWrapper>
                <Title>Engagement</Title>
                <Description>
                  Speak directly to your customers in a more meaningful way.
                </Description>
              </TextWrapper>
            </Item>
          </Link>
          <Link href="#">
            <Item>
              <MenuImageWrapper>
                <MenuImg src={ShieldCheck} alt="click" />
              </MenuImageWrapper>
              <TextWrapper>
                <Title>Security</Title>
                <Description>Your customers data will be safe and secure.</Description>
              </TextWrapper>
            </Item>
          </Link>
          <Link href="#">
            <Item>
              <MenuImageWrapper>
                <MenuImg src={ViewGrid} alt="click" />
              </MenuImageWrapper>
              <TextWrapper>
                <Title>Integrations</Title>
                <Description>Connect with third-party tools that you’re already using.</Description>
              </TextWrapper>
            </Item>
          </Link>
        </Container4>
      </Container3>
    </Container2>
  </Container1>
);

export default FlyoutMenu;
