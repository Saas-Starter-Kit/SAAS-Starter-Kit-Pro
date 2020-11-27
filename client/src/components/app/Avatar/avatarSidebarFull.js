import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';
import AvatarDropDown from './avatarDropDown';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AuthContext from '../../../utils/authContext';
import { colors } from '../../../styles/theme';
import DropdownSelector from '../../svgs/dropdownSelector';

const Wrapper = styled.div`
  margin-top: 1.5rem;
  cursor: pointer;
  &:hover {
    opacity: 95%;
  }
`;

const StyledAvatarWrapper = styled.div`
  color: ${colors.white};
  font-weight: 500;
  line-height: 1.25rem;
  font-size: 0.875rem;
  width: 100%;
  padding: 0.5rem 0.875rem;
`;

const UserWrapper1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const UserWrapper2 = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMdAccountCircle = styled(MdAccountCircle)`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const UsernameWrapper = styled.div`
  flex: 1 1 0%;
  min-width: 0;
  padding-left: 16px;
`;

const Username = styled.h2`
  color: ${colors.white};
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  font-weight: 500;
`;

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
`;

const AvatarSidebarFull = () => {
  const { authState } = useContext(AuthContext);
  const photo = authState.user ? authState.user.photo : null;
  const username = authState.user ? authState.user.username : 'Guest';
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <div ref={ref}>
      <Wrapper>
        <StyledAvatarWrapper
          onClick={avatarMenuHandler}
          type='button'
          aria-haspopup='true'
          aria-expanded='true'
        >
          <UserWrapper1>
            <UserWrapper2>
              {photo ? <Image src={photo} alt='' /> : <StyledMdAccountCircle />}
              <UsernameWrapper>
                <Username>{username}</Username>
              </UsernameWrapper>
            </UserWrapper2>
            <DropdownSelector />
          </UserWrapper1>
        </StyledAvatarWrapper>
      </Wrapper>
      {avatarMenu ? <AvatarDropDown avatarMenuHandler={avatarMenuHandler} /> : null}
    </div>
  );
};

export default AvatarSidebarFull;
