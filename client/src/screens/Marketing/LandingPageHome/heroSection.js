import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: #f9fafb;
  background-color: rgba(249, 250, 251, 1);
  background-image: url('/illustrations/blobSmall.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: -10% 0%;
`;

const ImageContainer = styled.div`
  background-color: #f9fafb;
  background-color: rgba(249, 250, 251, 1);
  background-image: url('/illustrations/blobBig.svg');
  background-repeat: no-repeat;
  background-position: 0% 0%;
`;

const HeroTextContainer = styled.div`
  padding-top: 3rem;
  padding-bottom: 5rem;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 1024px) {
    padding-top: 6rem;
    padding-bottom: 12rem;
    text-align: left;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeroHeader = styled.h2`
  font-size: 2.25rem;
  letter-spacing: -0.03rem;
  line-height: 2.5rem;
  font-weight: 800;
  color: #161e2e;

  @media (min-width: 640px) {
    line-height: 1;
    font-size: 3.3rem;
  }
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  font-size: 1.5rem;
  padding: 0.8rem 1.2rem 0.8rem 1.2rem;
  background-color: var(--primary-color);
  color: white;

  &:hover {
    opacity: 90%;
    outline: lightblue outset 3px;
  }
`;

const HeroSection = () => {
  return (
    <>
      <Container>
        <HeroTextContainer>
          <HeroHeader>
            Data to enrich your
            <span className='text-indigo-600'>&nbsp; online business</span>
          </HeroHeader>
          <p className='mt-3 text-lg text-gray-500 sm:text-xl md:mt-5'>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <Link href='/login'>
            <StyledButton type='primary'>Get started</StyledButton>
          </Link>
        </HeroTextContainer>
        <ImageContainer>
          <div className='hidden lg:block mt-8 p-12'>
            <img
              className='h-auto z-10 FadeInLeft'
              src='/illustrations/undraw_stepping_up_g6oo.svg'
              alt='Step Up'
            />
          </div>
        </ImageContainer>
      </Container>
    </>
  );
};

export default HeroSection;
