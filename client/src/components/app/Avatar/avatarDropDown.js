import { Link } from '@reach/router';

const AvatarDropDown = () => {
  return (
    <div className='MenuScale z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg max-content'>
      <div
        className='rounded-md bg-white shadow-xs'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='options-menu'
      >
        <div className='py-1'>
          <Link to='/app/settings'>
            <div
              className='block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
              role='menuitem'
            >
              Account Settings
            </div>
          </Link>
        </div>
        <div className='border-t border-gray-100'></div>
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
  );
};

export default AvatarDropDown;
