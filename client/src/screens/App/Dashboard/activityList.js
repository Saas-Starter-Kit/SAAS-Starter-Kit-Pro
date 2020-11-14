const ActivityList = () => {
  return (
    <div className='h-screen flex overflow-hidden bg-cool-gray-100'>
      <div className='flex-1 overflow-auto focus:outline-none' tabindex='0'>
        <main className='flex-1 relative pb-8 z-0 overflow-y-auto'>
          <div className='mt-8'>
            <h2 className=' mx-auto mt-8 px-4 text-lg leading-6 font-medium text-cool-gray-900'>
              Recent activity
            </h2>

            <div className='shadow sm:hidden'>
              <ul className='mt-2 divide-y divide-cool-gray-200 overflow-hidden shadow sm:hidden'>
                <li>
                  <a href='#' className='block px-4 py-4 bg-white hover:bg-cool-gray-50'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-1 flex space-x-2 truncate'>
                        {/*<!-- Heroicon name: cash -->*/}
                        <svg
                          className='flex-shrink-0 h-5 w-5 text-cool-gray-400'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                            clip-rule='evenodd'
                          />
                        </svg>
                        <div className='text-cool-gray-500 text-sm truncate'>
                          <p className='truncate'>Payment to Molly Sanders</p>
                          <p>
                            <span className='text-cool-gray-900 font-medium'>$20,000</span> USD
                          </p>
                          <p>July 11, 2020</p>
                        </div>
                      </div>
                      <div>
                        <svg
                          className='flex-shrink-0 h-5 w-5 text-cool-gray-400'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clip-rule='evenodd'
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
              <nav className='bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200'>
                <div className='flex-1 flex justify-between'>
                  <a
                    href='#'
                    className='relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150'
                  >
                    Previous
                  </a>
                  <a
                    href='#'
                    className='ml-3 relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150'
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            <div className='hidden sm:block'>
              <div className=''>
                <div className='flex flex-col mt-2'>
                  <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-cool-gray-200'>
                      <thead>
                        <tr>
                          <th className='px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider'>
                            Transaction
                          </th>
                          <th className='px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider'>
                            Amount
                          </th>
                          <th className='hidden px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider md:block'>
                            Status
                          </th>
                          <th className='px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider'>
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-cool-gray-200'>
                        <tr className='bg-white'>
                          <td className='max-w-0 w-full px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-900'>
                            <div className='flex'>
                              <a
                                href='#'
                                className='group inline-flex space-x-2 truncate text-sm leading-5'
                              >
                                {/*<!-- Heroicon name: cash -->*/}
                                <svg
                                  className='flex-shrink-0 h-5 w-5 text-cool-gray-400 group-hover:text-cool-gray-500 transition ease-in-out duration-150'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fill-rule='evenodd'
                                    d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                                    clip-rule='evenodd'
                                  />
                                </svg>
                                <p className='text-cool-gray-500 truncate group-hover:text-cool-gray-900 transition ease-in-out duration-150'>
                                  Payment to Molly Sanders
                                </p>
                              </a>
                            </div>
                          </td>
                          <td className='px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500'>
                            <span className='text-cool-gray-900 font-medium'>$20,000 </span>
                            USD
                          </td>
                          <td className='hidden px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-500 md:block'>
                            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800 capitalize'>
                              success
                            </span>
                          </td>
                          <td className='px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500'>
                            July 11, 2020
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <nav className='bg-white px-4 py-3 flex items-center justify-between border-t border-cool-gray-200 sm:px-6'>
                      <div className='hidden sm:block'>
                        <p className='text-sm leading-5 text-cool-gray-700'>
                          Showing
                          <span className='font-medium'>1</span>
                          to
                          <span className='font-medium'>10</span>
                          of
                          <span className='font-medium'>20</span>
                          results
                        </p>
                      </div>
                      <div className='flex-1 flex justify-between sm:justify-end'>
                        <a
                          href='#'
                          className='relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150'
                        >
                          Previous
                        </a>
                        <a
                          href='#'
                          className='ml-3 relative inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700 transition ease-in-out duration-150'
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivityList;
