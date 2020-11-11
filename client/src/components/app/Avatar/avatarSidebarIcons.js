import AvatarDropDown from './avatarDropDown';
import { useState, useRef, useContext } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AuthContext from '../../../utils/authContext';

const AvatarSidebarIcons = () => {
  const { authState } = useContext(AuthContext);
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div ref={ref}>
      <img
        onClick={avatarMenuHandler}
        className='w-10 h-10 mt-1 mb-2 cursor-pointer bg-gray-300 rounded-full flex-shrink-0'
        src={authState.user ? authState.user.photo : null}
        alt=''
      />
      {avatarMenu ? <AvatarDropDown /> : null}
    </div>
  );
};

export default AvatarSidebarIcons;
