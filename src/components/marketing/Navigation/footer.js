import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 2rem;
  background-color: #1e429f;
  background-color: rgba(30, 66, 159, 1);
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
  background-color: #5850ec;
`;

const BottomFooter = styled.div`
  background-color: #233876;
  color: white;
  font-size: 1.25rem;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <div className='bg-blue-900'>
      <IMGContainer>
        <img src='/illustrations/waveFooter.svg' alt='wave' />
      </IMGContainer>
      <Container>
        <Column>
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
    </div>
  );
};

export default Footer;
