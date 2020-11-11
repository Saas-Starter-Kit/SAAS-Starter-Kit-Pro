import AvatarDropDown from './avatarDropDown';
import { useState, useRef, useContext } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AuthContext from '../../../utils/authContext';

const AvatarSidebarFull = () => {
  const { authState } = useContext(AuthContext);
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div ref={ref}>
      <div className='mt-6'>
        <button
          onClick={avatarMenuHandler}
          type='button'
          className='group w-full px-3.5 py-2 text-sm leading-5 font-medium text-white  focus:outline-none'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
        >
          <div className='flex w-full justify-between items-center'>
            <div className='flex min-w-0 items-center justify-between space-x-3'>
              <img
                className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                src={authState.user ? authState.user.photo : null}
                alt=''
              />
              <div className='flex-1 min-w-0'>
                <h2 className='text-white text-sm leading-5 font-medium truncate'>
                  {authState.user.username}
                </h2>
              </div>
            </div>
            {/*<!-- Heroicon name: selector -->*/}
            <svg
              className='flex-shrink-0 h-5 w-5 text-white'
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
      {avatarMenu ? <AvatarDropDown /> : null}
    </div>
  );
};

export default AvatarSidebarFull;
