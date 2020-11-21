import { useRef } from 'react';
import { Link } from '@reach/router';
import useOutsideClick from '../../../hooks/useOutsideClick';

const SidebarMobile = ({ toggleMobileMenu }) => {
  const ref = useRef();
  useOutsideClick(ref, () => toggleMobileMenu(false));

  return (
    <div className='md:hidden'>
      <div className='fixed inset-0 flex z-40'>
        <div className='fixed inset-0 '>
          <div className='absolute inset-0 bg-gray-600 opacity-75 transition-opacity duration-300 ease-linear'></div>
        </div>
        <div
          ref={ref}
          className='ShowMobileSideBar relative flex-1 flex flex-col max-w-xs w-full bg-indigo-800'
        >
          <div className='absolute top-0 right-0 -mr-14 p-1'>
            <button
              onClick={() => toggleMobileMenu(false)}
              className='flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600'
              aria-label='Close sidebar'
            >
              <svg
                className='h-6 w-6 text-white'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
            <div className='flex-shrink-0 flex items-center px-4'>
              <img className='h-8 w-auto' src='/logo/large_logo.svg' alt='Workflow' />
            </div>
            <nav className='mt-5 px-2 space-y-1'>
              <Link to='/app'>
                <div
                  onClick={() => toggleMobileMenu(false)}
                  className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'
                >
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Dashboard
                </div>
              </Link>

              <Link to='/app/readupdate'>
                <div
                  onClick={() => toggleMobileMenu(false)}
                  className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'
                >
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  Read Update
                </div>
              </Link>

              <Link to='/app/create'>
                <div
                  onClick={() => toggleMobileMenu(false)}
                  className='group flex items-center px-2 py-4 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'
                >
                  <svg
                    className='mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                  Create
                </div>
              </Link>
            </nav>
          </div>
        </div>
        <div className='flex-shrink-0 w-14'>
          {/*<!-- Force sidebar to shrink to fit close icon -->*/}
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
