import { Link } from '@reach/router';
// import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import AuthContext from '../../utils/authContext';
import { colors } from '../../styles/theme';
import DropdownItem from './dropdownItem';

const menuScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  animation: ${menuScale} 0.3s ease-out forwards;
  z-index: 10;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  transform-origin: top;
  position: absolute;
  top: 7rem;
  left: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: max-content;
  border-radius: 0.375rem;
  background-color: ${colors.white};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
`;

const ItemWrapper = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Border = styled.div`
  border-top: 1px solid ${colors.gray100};
`;

const AvatarDropDown = ({ avatarMenuHandler }) => {
  const { LogOut } = useContext(AuthContext);

  // const router = useRouter();

  const signOut = () => {
    LogOut();
    // setTimeout(() => router.push('/login'), 200);
  };

  return (
    <Wrapper role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
      <ItemWrapper>
        <Link to='/app/settings'>
          <DropdownItem onClick={avatarMenuHandler} title='Account Settings' />
        </Link>
      </ItemWrapper>
      <Border />
      <Border />
      <ItemWrapper>
        <DropdownItem onClick={signOut} title='Logout' />
      </ItemWrapper>
    </Wrapper>
  );
};

export default AvatarDropDown;
