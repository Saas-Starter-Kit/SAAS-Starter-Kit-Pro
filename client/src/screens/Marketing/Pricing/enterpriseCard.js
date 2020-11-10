const EnterpriseCard = () => {
  return (
    <div className='mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3'>
      <div className='h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg'>
        <div className='flex-1 flex flex-col'>
          <div className='bg-white px-6 py-10'>
            <div>
              <h3
                className='text-center text-2xl leading-8 font-medium text-gray-900'
                id='tier-scale'
              >
                Scale
              </h3>
              <div className='mt-4 flex items-center justify-center'>
                <span className='px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900'>
                  <span className='mt-2 mr-2 text-4xl font-medium'>$</span>
                  <span className='font-extrabold'>349</span>
                </span>
                <span className='text-xl leading-7 font-medium text-gray-500'>/month</span>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10'>
            <ul>
              <li className='flex items-start'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-green-500'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <p className='ml-3 text-base leading-6 font-medium text-gray-500'>
                  Pariatur quod similique
                </p>
              </li>
              <li className='mt-4 flex items-start'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-green-500'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <p className='ml-3 text-base leading-6 font-medium text-gray-500'>
                  Sapiente libero doloribus
                </p>
              </li>
              <li className='mt-4 flex items-start'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-green-500'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <p className='ml-3 text-base leading-6 font-medium text-gray-500'>
                  Vel ipsa esse repudiandae
                </p>
              </li>
            </ul>
            <div className='mt-8'>
              <div className='rounded-lg shadow-md'>
                <a
                  href='#'
                  className='block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base leading-6 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150'
                  aria-describedby='tier-scale'
                >
                  Start your trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseCard;
