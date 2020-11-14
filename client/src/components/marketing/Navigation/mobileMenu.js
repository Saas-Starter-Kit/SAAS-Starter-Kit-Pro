import styled from 'styled-components';
import Link from 'next/link';

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
`;

const MobileMenu = ({ mobileMenuHandler }) => {
  return (
    <div className='MenuScale absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
      <div className='rounded-lg shadow-lg'>
        <div className='rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50'>
          <div className='pt-5 pb-6 px-5 space-y-6'>
            <div className='flex items-center justify-between py-4'>
              <img className='h-8 w-auto' src='/logo/small_logo.svg' alt='Workflow' />
              <div className='-mr-2'>
                <button
                  onClick={mobileMenuHandler}
                  type='button'
                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
                >
                  <img className='h-6 w-6' src='/icons/close.svg' alt='menu icon' />
                </button>
              </div>
            </div>
            <div>
              <nav className='grid grid-cols-1 gap-7'>
                <Link href='/pricing'>
                  <div
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: view-grid -->*/}
                      <MenuImg src='/icons/view-grid.svg' alt='click' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Pricing</div>
                  </div>
                </Link>
                <Link href='/app'>
                  <div className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'>
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: view-grid -->*/}
                      <MenuImg src='/icons/view-grid.svg' alt='click' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>App</div>
                  </div>
                </Link>
                <hr />
                <h2 className='text-lg'>Solutions: </h2>
                <Link href='#'>
                  <div className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'>
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: chart-bar -->*/}
                      <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Analytics</div>
                  </div>
                </Link>
                <Link href='#'>
                  <div
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: cursor-click -->*/}
                      <MenuImg src='/icons/cursor-click.svg' alt='click' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Engagement</div>
                  </div>
                </Link>
                <Link href='#'>
                  <div
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: shield-check -->*/}
                      <MenuImg src='/icons/shield-check.svg' alt='click' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Security</div>
                  </div>
                </Link>
                <Link href='#'>
                  <div
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: view-grid -->*/}
                      <MenuImg src='/icons/view-grid.svg' alt='click' />
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>
                      Integrations
                    </div>
                  </div>
                </Link>
              </nav>
            </div>
          </div>
          <div className='py-6 px-5 space-y-6'>
            <div className='space-y-6'>
              <Link href='/login'>
                <div className='w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'>
                  Sign up
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
