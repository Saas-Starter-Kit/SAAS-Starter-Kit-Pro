import styled from 'styled-components';

const Header = () => {
  return (
    <div className='relative bg-white'>
      <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
        <div className='lg:w-0 lg:flex-1'>
          <a href='#' className='flex'>
            <img
              className='h-8 w-auto sm:h-10'
              src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
              alt='Workflow'
            />
          </a>
        </div>
        <div className='-mr-2 -my-2 md:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
          >
            {/*<!-- Heroicon name: menu -->*/}
            <img src='/icons/menu.svg' alt='menu' />
          </button>
        </div>

        <nav className='hidden md:flex space-x-10'>
          <a
            href='#'
            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150'
          >
            Pricing
          </a>
          <a
            href='#'
            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150'
          >
            Docs
          </a>
          <div className='relative'>
            {/*<!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->*/}
            <button
              type='button'
              className='group text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150'
            >
              <span>Solutions</span>
              {/*<!--
            Heroicon name: chevron-down

            Item active: "text-gray-600", Item inactive: "text-gray-400"
          -->*/}
              <svg
                className='text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                />
              </svg>
            </button>
            {/*
        <!--
          'Solutions' flyout menu, show/hide based on flyout menu state.

          Entering: "transition ease-out duration-200"
            From: "opacity-0 translate-y-1"
            To: "opacity-100 translate-y-0"
          Leaving: "transition ease-in duration-150"
            From: "opacity-100 translate-y-0"
            To: "opacity-0 translate-y-1"
        -->*/}
          </div>
        </nav>

        <div className='hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0'>
          <a
            href='#'
            className='whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900'
          >
            Sign in
          </a>
          <span className='inline-flex rounded-md shadow-sm'>
            <a
              href='#'
              className='whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
            >
              Sign up
            </a>
          </span>
        </div>
      </div>

      {/*<!--
    Mobile menu, show/hide based on mobile menu state.

      Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->*/}
    </div>
  );
};

export default Header;
