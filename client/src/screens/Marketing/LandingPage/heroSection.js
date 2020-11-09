import styled from 'styled-components';

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

const HeroSection = () => {
  return (
    <>
      <Container>
        <div className='pt-16 pb-20 text-center lg:py-48 lg:text-left'>
          <div className='px-4 sm:px-8 xl:pr-16'>
            <h2 className='text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl'>
              Data to enrich your
              <br className='xl:hidden' />
              <span className='text-indigo-600'>online business</span>
            </h2>
            <p className='mt-3 text-lg text-gray-500 sm:text-xl md:mt-5'>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
              <div className='rounded-md shadow'>
                <a
                  href='#'
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'
                >
                  Get started
                </a>
              </div>
              <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                <a
                  href='#'
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </div>
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
