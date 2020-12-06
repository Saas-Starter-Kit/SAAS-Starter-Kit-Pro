import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SocialBarFooter from './socialBarFooter';
import { colors } from '../../styles/theme';

const Wrapper = styled.div`
  background-color: ${colors.blue800};
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 2rem;
  background-color: ${colors.blue800};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLink = styled.p`
  padding: 1rem;
  font-weight: 800;
  color: white;
  cursor: pointer;
`;

const IMGContainer = styled.div`
  background-color: ${(props) => (props.isHome ? colors.indigo600 : colors.white)};
`;

const BottomFooter = styled.div`
  background-color: ${colors.blue900};
  color: white;
  font-size: 1.25rem;
  padding: 1rem;
  text-align: center;
`;

const FooterColHeader = styled.p`
  font-weight: 800;
  color: white;
  text-decoration: underline;
`;

const Footer = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <IMGContainer isHome={router.pathname == '/' ? true : false}>
        <img src='/illustrations/waveFooter.svg' alt='wave' />
      </IMGContainer>
      <SocialBarFooter />
      <Container>
        <Column>
          <FooterColHeader>Header 1</FooterColHeader>
          <Link href='/'>
            <FooterLink>Link1</FooterLink>
          </Link>
          <Link href='/'>
            <FooterLink>Link2</FooterLink>
          </Link>
          <Link href='/'>
            <FooterLink>Link3</FooterLink>
          </Link>
        </Column>
        <Column>
          <FooterColHeader>Header 2</FooterColHeader>
          <Link href='/'>
            <FooterLink>Link1</FooterLink>
          </Link>
          <Link href='/'>
            <FooterLink>Link2</FooterLink>
          </Link>
          <Link href='/'>
            <FooterLink>Link3</FooterLink>
          </Link>
        </Column>
      </Container>
      <BottomFooter>Copyright &copy; 2020 Example Inc</BottomFooter>
    </Wrapper>
  );
};

export default Footer;
