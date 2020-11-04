//Landing Page

export default function Home() {
  return (
    //<!--
    //  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    //  Read the documentation to get started: https://tailwindui.com/documentation
    //-->
    //<div className='bg-gray-50'>
    //  <div className=' bg-white shadow'>
    //    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
    //      <div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
    //        <div className='w-0 flex-1 flex'>
    //          <a href='#' className='inline-flex'>
    //            <img
    //              className='h-8 w-auto sm:h-10'
    //              src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
    //              alt='Workflow'
    //            />
    //          </a>
    //        </div>
    //        <div className='-mr-2 -my-2 md:hidden'>
    //          <button
    //            type='button'
    //            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
    //          >
    //            {/*<!-- Heroicon name: menu -->*/}
    //            <svg
    //              className='h-6 w-6'
    //              xmlns='http://www.w3.org/2000/svg'
    //              fill='none'
    //              viewBox='0 0 24 24'
    //              stroke='currentColor'
    //            >
    //              <path
    //                stroke-linecap='round'
    //                stroke-linejoin='round'
    //                stroke-width='2'
    //                d='M4 6h16M4 12h16M4 18h16'
    //              />
    //            </svg>
    //          </button>
    //        </div>
    //        <nav className='hidden md:flex space-x-10'>
    //          <a
    //            href='#'
    //            className='text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 transition ease-in-out duration-150'
    //          >
    //            Solutions
    //          </a>
    //          <a
    //            href='#'
    //            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150'
    //          >
    //            Pricing
    //          </a>
    //          <a
    //            href='#'
    //            className='text-base leading-6 font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150'
    //          >
    //            Docs
    //          </a>
    //          <a
    //            href='#'
    //            className='text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 transition ease-in-out duration-150'
    //          >
    //            More
    //          </a>
    //        </nav>
    //        <div className='hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0'>
    //          <a
    //            href='#'
    //            className='whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150'
    //          >
    //            Sign in
    //          </a>
    //          <span className='inline-flex rounded-md shadow-sm'>
    //            <a
    //              href='#'
    //              className='whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
    //            >
    //              Sign up
    //            </a>
    //          </span>
    //        </div>
    //      </div>
    //    </div>

    //    {/*<!--
    //  Mobile menu, show/hide based on mobile menu state.

    //  Entering: "duration-200 ease-out"
    //    From: "opacity-0 scale-95"
    //    To: "opacity-100 scale-100"
    //  Leaving: "duration-100 ease-in"
    //    From: "opacity-100 scale-100"
    //    To: "opacity-0 scale-95"
    //-->*/}
    //    <div className='absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden'>
    //      <div className='rounded-lg shadow-lg'>
    //        <div className='rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50'>
    //          <div className='pt-5 pb-6 px-5 space-y-6'>
    //            <div className='flex items-center justify-between'>
    //              <div>
    //                <img
    //                  className='h-8 w-auto'
    //                  src='https://tailwindui.com/img/logos/workflow-mark-on-white.svg'
    //                  alt='Workflow'
    //                />
    //              </div>
    //              <div className='-mr-2'>
    //                <button
    //                  type='button'
    //                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
    //                >
    //                  {/*<!-- Heroicon name: x -->*/}
    //                  <svg
    //                    className='h-6 w-6'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M6 18L18 6M6 6l12 12'
    //                    />
    //                  </svg>
    //                </button>
    //              </div>
    //            </div>
    //            <div>
    //              <nav className='grid gap-y-8'>
    //                <a
    //                  href='#'
    //                  className='-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150'
    //                >
    //                  {/*<!-- Heroicon name: chart-bar -->*/}
    //                  <svg
    //                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    //                    />
    //                  </svg>
    //                  <div className='text-base leading-6 font-medium text-gray-900'>Analytics</div>
    //                </a>
    //                <a
    //                  href='#'
    //                  className='-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150'
    //                >
    //                  {/*<!-- Heroicon name: cursor-click -->*/}
    //                  <svg
    //                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
    //                    />
    //                  </svg>
    //                  <div className='text-base leading-6 font-medium text-gray-900'>
    //                    Engagement
    //                  </div>
    //                </a>
    //                <a
    //                  href='#'
    //                  className='-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150'
    //                >
    //                  {/*<!-- Heroicon name: shield-check -->*/}
    //                  <svg
    //                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    //                    />
    //                  </svg>
    //                  <div className='text-base leading-6 font-medium text-gray-900'>Security</div>
    //                </a>
    //                <a
    //                  href='#'
    //                  className='-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150'
    //                >
    //                  {/*<!-- Heroicon name: view-grid -->*/}
    //                  <svg
    //                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    //                    />
    //                  </svg>
    //                  <div className='text-base leading-6 font-medium text-gray-900'>
    //                    Integrations
    //                  </div>
    //                </a>
    //                <a
    //                  href='#'
    //                  className='-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150'
    //                >
    //                  {/*<!-- Heroicon name: refresh -->*/}
    //                  <svg
    //                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
    //                    xmlns='http://www.w3.org/2000/svg'
    //                    fill='none'
    //                    viewBox='0 0 24 24'
    //                    stroke='currentColor'
    //                  >
    //                    <path
    //                      stroke-linecap='round'
    //                      stroke-linejoin='round'
    //                      stroke-width='2'
    //                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    //                    />
    //                  </svg>
    //                  <div className='text-base leading-6 font-medium text-gray-900'>
    //                    Automations
    //                  </div>
    //                </a>
    //              </nav>
    //            </div>
    //          </div>
    //          <div className='py-6 px-5 space-y-6'>
    //            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Pricing
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Docs
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Enterprise
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Blog
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Help Center
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Guides
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Security
    //              </a>
    //              <a
    //                href='#'
    //                className='text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150'
    //              >
    //                Events
    //              </a>
    //            </div>
    //            <div className='space-y-6'>
    //              <span className='w-full flex rounded-md shadow-sm'>
    //                <a
    //                  href='#'
    //                  className='w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
    //                >
    //                  Sign up
    //                </a>
    //              </span>
    //              <p className='text-center text-base leading-6 font-medium text-gray-500'>
    //                Existing customer?
    //                <a
    //                  href='#'
    //                  className='text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150'
    //                >
    //                  Sign in
    //                </a>
    //              </p>
    //            </div>
    //          </div>
    //        </div>
    //      </div>
    //    </div>
    //  </div>

    <main className='grid grid-cols-2 bg-blue-300'>
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
      <div className='mt-8 p-12'>
        <img className='h-auto' src='/illustrations/undraw_stepping_up_g6oo.svg' alt='Step Up' />
      </div>
    </main>
    //</div>
  );
}
