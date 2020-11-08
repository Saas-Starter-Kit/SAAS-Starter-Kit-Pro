import AvatarDropDown from './avatarDropDown';
import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

const AvatarSidebarIcons = () => {
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div ref={ref}>
      <img
        onClick={avatarMenuHandler}
        className='w-10 h-10 mt-1 mb-2 cursor-pointer bg-gray-300 rounded-full flex-shrink-0'
        src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
        alt=''
      />
      {avatarMenu ? <AvatarDropDown /> : null}
    </div>
  );
};

export default AvatarSidebarIcons;
