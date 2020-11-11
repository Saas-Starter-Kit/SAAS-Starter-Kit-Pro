import AvatarDropDown from './avatarDropDown';
import { useState, useRef, useContext } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AuthContext from '../../../utils/authContext';
import { MdAccountCircle } from 'react-icons/md';

const AvatarSidebarIcons = () => {
  const { authState } = useContext(AuthContext);
  const photo = authState.user ? authState.user.photo : null;
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div ref={ref}>
      {photo ? (
        <img
          onClick={avatarMenuHandler}
          className='cursor-pointer w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mb-4'
          src={photo}
          alt=''
        />
      ) : (
        <MdAccountCircle
          onClick={avatarMenuHandler}
          className='cursor-pointer w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mb-4'
        />
      )}
      {avatarMenu ? <AvatarDropDown /> : null}
    </div>
  );
};

export default AvatarSidebarIcons;
