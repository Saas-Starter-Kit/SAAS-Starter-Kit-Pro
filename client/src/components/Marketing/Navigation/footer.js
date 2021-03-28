import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import SmallLogo from '../../../components/Common/svgs/SmallLogo';

const Wrapper = styled.div`
  background-color: #292c2f;
  font-size: 0.9rem;
`;

const TopBuffer = styled.div`
  background-color: ${colors.blue900};
  padding-top: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 2rem;
  padding-top: 4rem;
  padding-bottom: 3rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLink = styled.div`
  font-weight: 500;
  color: #bbb;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const BottomFooter = styled.div`
  background-color: ${colors.blue900};
  color: white;
  padding-top: 0.8rem;
  height: 3rem;
  text-align: center;
`;

const FooterColHeader = styled.div`
  font-weight: 800;
  color: #bbb;
`;

const ImageCol = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      <TopBuffer />
      <Container>
        <ImageCol>
          <SmallLogo height={65} width={76} />
        </ImageCol>
        <Column>
          <FooterColHeader>Header 1</FooterColHeader>
          <Link to="/">
            <FooterLink>Link1</FooterLink>
          </Link>
          <Link to="/">
            <FooterLink>Link2</FooterLink>
          </Link>
          <Link to="/">
            <FooterLink>Link3</FooterLink>
          </Link>
        </Column>
        <Column>
          <FooterColHeader>Header 2</FooterColHeader>
          <Link to="/">
            <FooterLink>Link1</FooterLink>
          </Link>
          <Link to="/">
            <FooterLink>Link2</FooterLink>
          </Link>
          <Link to="/">
            <FooterLink>Link3</FooterLink>
          </Link>
        </Column>
      </Container>
      <BottomFooter>Copyright &copy; 2020 Example Inc</BottomFooter>
    </Wrapper>
  );
};

export default Footer;
