// Feature Section for Landing Page
import styled from 'styled-components';

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
`;

const LandingFeatures = () => {
  return (
    <div className='py-16 bg-gray-50 overflow-hidden lg:py-24'>
      <div className='relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl'>
        <svg
          className='hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4'
          width='404'
          height='784'
          fill='none'
          viewBox='0 0 404 784'
        >
          <defs>
            <pattern
              id='b1e6e422-73f8-40a6-b5d9-c8586e37e0e7'
              x='0'
              y='0'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <rect
                x='0'
                y='0'
                width='4'
                height='4'
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect width='404' height='784' fill='url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)' />
        </svg>
        <div className='relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center'>
          <div className='relative'>
            <h4 className='text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9'>
              Awesome Feature about App 1
            </h4>
            <p className='mt-3 text-lg leading-7 text-gray-500'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi
              recusandae, porro maiores officia assumenda aliquam laborum ab aliquid veritatis
              impedit odit adipisci optio iste blanditiis facere. Totam, velit.
            </p>

            <ul className='mt-10'>
              <li>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                      <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h5 className='text-lg leading-6 font-medium text-gray-900'>Sub Feature 1</h5>
                    <p className='mt-2 text-base leading-6 text-gray-500'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                      perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                    </p>
                  </div>
                </div>
              </li>
              <li className='mt-10'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                      <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h5 className='text-lg leading-6 font-medium text-gray-900'>Sub Feature 2</h5>
                    <p className='mt-2 text-base leading-6 text-gray-500'>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                      perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className='mt-10 -mx-4 relative lg:mt-0'>
            <svg
              className='absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden'
              width='784'
              height='404'
              fill='none'
              viewBox='0 0 784 404'
            >
              <defs>
                <pattern
                  id='ca9667ae-9f92-4be7-abcb-9e3d727f2941'
                  x='0'
                  y='0'
                  width='20'
                  height='20'
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x='0'
                    y='0'
                    width='4'
                    height='4'
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect width='784' height='404' fill='url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)' />
            </svg>
            <img
              className='relative mx-auto'
              width='490'
              src='https://tailwindui.com/img/features/feature-example-1.png'
              alt=''
            />
          </div>
        </div>
        <svg
          className='hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12'
          width='404'
          height='784'
          fill='none'
          viewBox='0 0 404 784'
        >
          <defs>
            <pattern
              id='64e643ad-2176-4f86-b3d7-f2c5da3b6a6d'
              x='0'
              y='0'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <rect
                x='0'
                y='0'
                width='4'
                height='4'
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect width='404' height='784' fill='url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)' />
        </svg>
        <div className='relative mt-12 sm:mt-16 lg:mt-24'>
          <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
            <div className='lg:col-start-2'>
              <h4 className='text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9'>
                Awesome Feature about App 2
              </h4>
              <p className='mt-3 text-lg leading-7 text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus
                eligendi delectus, cum deleniti sunt in labore nihil quod quibusdam expedita nemo.
              </p>

              <ul className='mt-10'>
                <li>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h5 className='text-lg leading-6 font-medium text-gray-900'>Sub Feature 1</h5>
                      <p className='mt-2 text-base leading-6 text-gray-500'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                        perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                      </p>
                    </div>
                  </div>
                </li>
                <li className='mt-10'>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h5 className='text-lg leading-6 font-medium text-gray-900'>Sub Feature 2</h5>
                      <p className='mt-2 text-base leading-6 text-gray-500'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                        perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className='mt-10 -mx-4 relative lg:mt-0 lg:col-start-1'>
              <svg
                className='absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden'
                width='784'
                height='404'
                fill='none'
                viewBox='0 0 784 404'
              >
                <defs>
                  <pattern
                    id='e80155a9-dfde-425a-b5ea-1f6fadd20131'
                    x='0'
                    y='0'
                    width='20'
                    height='20'
                    patternUnits='userSpaceOnUse'
                  >
                    <rect
                      x='0'
                      y='0'
                      width='4'
                      height='4'
                      className='text-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect width='784' height='404' fill='url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)' />
              </svg>
              <img
                className='relative mx-auto'
                width='490'
                src='https://tailwindui.com/img/features/feature-example-2.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFeatures;
