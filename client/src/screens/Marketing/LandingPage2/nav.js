import React, { useState } from 'react';
import { Link } from 'gatsby';
import Sticky from 'react-stickynode';
import styled from 'styled-components';
import RcDrawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';

import { breakpoints, colors } from '../../../styles/theme';
import Logo from '../../../assets/images/logo/large_logo.svg';
import './assets/css/flaticon.css';

import BurgerIcon from '../../../components/Marketing/svgs/BurgerIcon';

const Container1 = styled.div`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  transition: 0.35s ease-in-out;
`;

const Container2 = styled.div`
  display: block;
`;

const Container3 = styled.div`
  padding: 0px 30px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    max-width: 750px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.large}) {
    max-width: 970px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    max-width: 1170px;
    width: 100%;
  }
`;

const Container4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${breakpoints.large}) {
    justify-content: flex-start;
  }
  width: 100%;
`;

const Image = styled.img`
  display: block;
  height: auto;
  width: 8rem;
  padding: 0.4rem;
  border-radius: 1rem;
  max-width: 9rem;
  background-color: black;
  @media (min-width: ${breakpoints.large}) {
    margin-right: 10rem;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

const NavMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerClose = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: ${breakpoints.medium}) {
    top: 1rem;
    right: 1rem;
  }
  &:before {
    content: '\f10b';
    font-family: Flaticon;
    font-size: 1.5rem;
    color: ${colors.cinnabar};
    transform: rotate(45deg);
    display: block;
  }
`;

const DrawerHandler = styled.div`
  display: inline-block;
  @media (min-width: ${breakpoints.large}) {
    display: none !important;
  }
`;

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Sticky top={0} innerZ={9999}>
      <Container1>
        <Container2>
          <Container3>
            <Container4>
              <Link to="/">
                <Image src={Logo} alt="Agency" />
              </Link>

              <Nav>
                <Link
                  className="header_link"
                  activeClassName="header_active_link"
                  to="/pricing/pricing2"
                >
                  Pricing
                </Link>

                <Link
                  className="header_link"
                  activeClassName="header_active_link"
                  to="/app/dashboard"
                >
                  App
                </Link>
              </Nav>
              <RcDrawer
                width="18rem"
                placement="right"
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                handler={false}
                level={null}
              >
                <DrawerClose
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  role="button"
                  tabIndex="0"
                />
                <NavMobile>
                  <Link
                    className="header_link_mobile"
                    activeClassName="header_link_active_mobile"
                    to="/pricing"
                  >
                    Pricing
                  </Link>

                  <Link
                    className="header_link_mobile"
                    activeClassName="header_link_active_mobile"
                    to="/app/dashboard"
                  >
                    App
                  </Link>
                </NavMobile>
              </RcDrawer>
              <DrawerHandler
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                role="button"
                tabIndex="0"
              >
                <BurgerIcon />
              </DrawerHandler>
            </Container4>
          </Container3>
        </Container2>
      </Container1>
    </Sticky>
  );
};

export default NavBar;
