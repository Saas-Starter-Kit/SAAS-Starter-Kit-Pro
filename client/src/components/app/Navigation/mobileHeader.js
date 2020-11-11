//Mobile App header
import { useState, useRef, useContext } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AvatarDropDownMobile from '../Avatar/avatarDropDownMobile';
import AuthContext from '../../../utils/authContext';

const MobileHeader = ({ mobileMenuHandler }) => {
  const { authState } = useContext(AuthContext);
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div className='md:hidden flex justify-between bg-blue-500 p-1'>
      <button
        onClick={mobileMenuHandler}
        className='pt-2 pl-2 font-semibold inline-flex items-center justify-center rounded-md text-white focus:outline-none'
        aria-label='Open sidebar'
      >
        <svg
          className='h-10 w-10'
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
      <div ref={ref} className='p-2'>
        <img
          onClick={avatarMenuHandler}
          className='w-12 h-12 bg-gray-300 rounded-full flex-shrink-0'
          src={authState.user ? authState.user.photo : null}
          alt=''
        />
      </div>
      {avatarMenu ? <AvatarDropDownMobile /> : null}
    </div>
  );
};

export default MobileHeader;
