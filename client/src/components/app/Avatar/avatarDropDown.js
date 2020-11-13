import { Link } from '@reach/router';
import AuthContext from '../../../utils/authContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const AvatarDropDown = ({ avatarMenuHandler }) => {
  const { LogOut } = useContext(AuthContext);

  const router = useRouter();

  const signOut = () => {
    LogOut();
    setTimeout(() => router.push('/login'), 200);
  };

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
              onClick={avatarMenuHandler}
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
          <div
            onClick={signOut}
            className='block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
            role='menuitem'
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropDown;
