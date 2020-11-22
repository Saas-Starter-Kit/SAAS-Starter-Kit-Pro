//Mobile App header
import { useState, useRef, useContext } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AvatarDropDownMobile from '../Avatar/avatarDropDownMobile';
import AuthContext from '../../../utils/authContext';
import Burger from '../../svgs/burger';

const Wrapper = styled.div`
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
  display: flex;
  justify-content: space-between;
  background-color: ${colors.indigo600};
  padding: 0.25rem;
`;

const Button = styled.button`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: ${colors.white};
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const AvatarWrapper = styled.div`
  padding: 0.5rem;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const StyledMdAccountCircle = styled(MdAccountCircle)`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const MobileHeader = ({ mobileMenuHandler }) => {
  const { authState } = useContext(AuthContext);
  const photo = authState.user ? authState.user.photo : null;
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));
  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <Wrapper>
      <Button onClick={mobileMenuHandler} aria-label='Open sidebar'>
        <Burger />
      </Button>
      <AvatarWrapper ref={ref}>
        {photo ? (
          <Image onClick={avatarMenuHandler} src={photo} alt='' />
        ) : (
          <StyledMdAccountCircle onClick={avatarMenuHandler} />
        )}
      </AvatarWrapper>
      {avatarMenu && <AvatarDropDownMobile avatarMenuHandler={avatarMenuHandler} />}
    </Wrapper>
  );
};

export default MobileHeader;
