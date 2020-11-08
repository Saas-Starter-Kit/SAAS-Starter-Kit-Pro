const AvatarDropDownMobile = () => {
  return (
    <div className='MenuScale z-10 mx-3 origin-top absolute top-16 right-0 left-100 mt-1 rounded-md shadow-lg max-content'>
      <div
        className='rounded-md bg-white shadow-xs'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='options-menu'
      >
        <div className='py-2 text-xl'>
          <a
            href='#'
            className='block px-4 py-4 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
            role='menuitem'
          >
            View profile
          </a>
          <a
            href='#'
            className='block px-4 py-4 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
            role='menuitem'
          >
            Settings
          </a>
        </div>
        <div className='border-t border-gray-100'></div>
        <div className='border-t border-gray-100'></div>
        <div className='py-1'>
          <a
            href='#'
            className='block px-4 py-4 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
            role='menuitem'
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropDownMobile;
