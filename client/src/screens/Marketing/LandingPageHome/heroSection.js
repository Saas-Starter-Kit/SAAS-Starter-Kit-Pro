import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { colors, breakpoints } from '../../../styles/theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: ${colors.gray50};
  background-image: url('/illustrations/blobSmall.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0% 0%;
`;

const HeroTextContainer = styled.div`
  padding: 3rem 1rem 5rem;
  text-align: center;
  @media (min-width: ${breakpoints.large}) {
    padding: 6rem 2rem 12rem;
    text-align: left;
  }
`;

const HeroHeader = styled.h2`
  font-size: 2.25rem;
  letter-spacing: -0.03rem;
  line-height: 2.5rem;
  font-weight: 800;
  color: ${colors.gray900};
  @media (min-width: ${breakpoints.small}) {
    line-height: 1;
    font-size: 3.3rem;
  }
`;

const Span = styled.span`
  color: ${colors.indigo600};
`;

const Paragraph = styled.p`
  margin-top: 0.75rem;
  font-size: 1.125rem;
  color: ${colors.gray500};
  @media (min-width: ${breakpoints.small}) {
    font-size: 1.25rem;
  }
  @media (min-width: ${breakpoints.medium}) {
    margin-top: 1.25rem;
  }
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  font-size: 1.5rem;
  padding: 0.8rem 1.2rem 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  &:hover {
    opacity: 95%;
    outline: lightblue solid 2px;
  }
`;

const ImageContainer = styled.div`
  display: none;
  background-color: ${colors.gray50};
  background-image: url('/illustrations/blobBig.svg');
  background-repeat: no-repeat;
  background-position: 0% 0%;

  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
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

const Image = styled.img`
  margin-top: 3rem;
  padding: 3rem;
  height: auto;
  width: 32rem;
  z-index: 10;
  animation: ${fadeInLeft} 0.7s ease-in forwards;
`;

const HeroSection = () => (
  <Container>
    <HeroTextContainer>
      <HeroHeader>
        Data to enrich your
        <Span> online business</Span>
      </HeroHeader>
      <Paragraph>
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
        Elit sunt amet fugiat veniam occaecat fugiat aliqua.
      </Paragraph>
      <Link href='/login'>
        <StyledButton type='primary'>Get started &#8594;</StyledButton>
      </Link>
    </HeroTextContainer>

    <ImageContainer>
      <Image src='/illustrations/undraw_stepping_up_g6oo.svg' alt='Step Up' />
    </ImageContainer>
  </Container>
);

export default HeroSection;
