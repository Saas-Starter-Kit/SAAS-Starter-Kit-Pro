const AvatarDropDown = () => {
  return (
    <div>
      <div>
        <button
          type='button'
          className='group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
        >
          <div className='flex w-full justify-between items-center'>
            <div className='flex min-w-0 items-center justify-between space-x-3'>
              <img
                className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                alt=''
              />
              <div className='flex-1 min-w-0'>
                <h2 className='text-gray-900 text-sm leading-5 font-medium truncate'>
                  Jessy Schwarz
                </h2>
                <p className='text-gray-500 text-sm leading-5 truncate'>@jessyschwarz</p>
              </div>
            </div>
            {/*<!-- Heroicon name: selector -->*/}
            <svg
              className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clip-rule='evenodd'
              />
            </svg>
          </div>
        </button>
      </div>
      <div className='z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg'>
        <div
          className='rounded-md bg-white shadow-xs'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1'>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              View profile
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Settings
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Notifications
            </a>
          </div>
          <div className='border-t border-gray-100'></div>
          <div className='py-1'>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Get desktop app
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Support
            </a>
          </div>
          <div className='border-t border-gray-100'></div>
          <div className='py-1'>
            <a
              href='#'
              className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropDown;
