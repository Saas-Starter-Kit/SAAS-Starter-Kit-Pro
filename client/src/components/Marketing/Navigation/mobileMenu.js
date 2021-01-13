import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';
import { colors, breakpoints } from '../../../styles/theme';
import SmallLogo from '../../../assets/images/logo/small_logo.svg';
import Close from '../../../assets/images/icons/close.svg';
import ViewGrid from '../../../assets/images/icons/view-grid.svg';

const menuUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }`;

const Wrapper = styled.div`
  animation: ${menuUp} 0.3s ease-out forwards;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.25rem 1.25rem 1.5rem;
  background-color: ${colors.white};
  border-color: ${colors.gray50};
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transform-origin: top right;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 2rem;
}
`;

const LogoImage = styled.img`
  height: 2rem;
  width: auto;
`;

const CloseButtonWrapper = styled.div`
  margin-right: -0.5rem;
`;

const CloseButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: ${colors.gray400};
  &:hover {
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const CloseImage = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1.75rem;
  gap: 1.75rem;
  margin-left: 1rem;
`;

const Item = styled.div`
  margin: -0.75rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${colors.gray50};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const MenuImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.375rem;
  background-color: ${colors.indigo500};
  color: ${colors.white};
`;

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
  margin-right: 0 !important;
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const ButtonWrapper1 = styled.div`
  margin-top: 1.5rem;
  padding: 0 1.25rem 1.5rem;
`;

const ButtonWrapper2 = styled.div`
  margin-top: 1.5rem;
`;

const Button = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-width: 1px;
  border-color: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: ${colors.indigo700};
    box-shadow: 0 0 0 3px rgba(180, 198, 252, 0.45);
  }
  &:active {
    background-color: ${colors.indigo700};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const MobileMenu = ({ mobileMenuHandler }) => (
  <Wrapper>
    <Header>
      <LogoImage src={SmallLogo} alt="Workflow" />
      <CloseButtonWrapper>
        <CloseButton onClick={mobileMenuHandler} type="button">
          <CloseImage src={Close} alt="menu icon" />
        </CloseButton>
      </CloseButtonWrapper>
    </Header>
    <div>
      <Nav>
        <Link to="/pricing">
          <Item>
            <MenuImageWrapper>
              {/*<!-- Heroicon name: view-grid -->*/}
              <MenuImg src={ViewGrid} alt="click" />
            </MenuImageWrapper>
            <Title>Pricing</Title>
          </Item>
        </Link>
        <Link to="/app">
          <Item>
            <MenuImageWrapper>
              {/*<!-- Heroicon name: view-grid -->*/}
              <MenuImg src={ViewGrid} alt="click" />
            </MenuImageWrapper>
            <Title>App</Title>
          </Item>
        </Link>
        <hr />
      </Nav>
    </div>
    <ButtonWrapper1>
      <ButtonWrapper2>
        <Link to="/auth/login">
          <Button>Sign up</Button>
        </Link>
      </ButtonWrapper2>
    </ButtonWrapper1>
  </Wrapper>
);

export default MobileMenu;
