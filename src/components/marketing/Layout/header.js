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
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
        <nav className='hidden md:flex space-x-10'>
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
            <div className='absolute -ml-4 mt-3 transform w-screen max-w-md md:max-w-3xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'>
              <div className='rounded-lg shadow-lg'>
                <div className='rounded-lg shadow-xs overflow-hidden'>
                  <div className='z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2'>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: chart-bar -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>Analytics</p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Get a better understanding of where your traffic is coming from.
                        </p>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: cursor-click -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>Engagement</p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Speak directly to your customers in a more meaningful way.
                        </p>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: shield-check -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>Security</p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Your customers data will be safe and secure.
                        </p>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: view-grid -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>
                          Integrations
                        </p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Connect with third-party tools that you’re already using.
                        </p>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: refresh -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>Automations</p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Build strategic funnels that will drive your customers to convert
                        </p>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                    >
                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12'>
                        {/*<!-- Heroicon name: document-report -->*/}
                        <svg
                          className='h-6 w-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-base leading-6 font-medium text-gray-900'>Reports</p>
                        <p className='text-sm leading-5 text-gray-500'>
                          Get detailed reports that will help you make more informed decisions
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      <div className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
        <div className='rounded-lg shadow-lg'>
          <div className='rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5 space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='-mr-2'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
                  >
                    {/*<!-- Heroicon name: x -->*/}
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
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
              </div>
              <div>
                <nav className='grid grid-cols-1 gap-7'>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: chart-bar -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Analytics</div>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: cursor-click -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Engagement</div>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: shield-check -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Security</div>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: view-grid -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>
                      Integrations
                    </div>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: refresh -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Automations</div>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150'
                  >
                    <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white'>
                      {/*<!-- Heroicon name: document-report -->*/}
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </div>
                    <div className='text-base leading-6 font-medium text-gray-900'>Reports</div>
                  </a>
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='space-y-6'>
                <span className='w-full flex rounded-md shadow-sm'>
                  <a
                    href='#'
                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
                  >
                    Sign up
                  </a>
                </span>
                <p className='text-center text-base leading-6 font-medium text-gray-500'>
                  <a
                    href='#'
                    className='text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150'
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
