import React, { useState } from 'react';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from 'styled-components';
import RcDrawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import {
  landingPage2Breakpoints as breakpoints,
  landingPage2Colors as colors
} from '../../../../styles/theme';
import Logo from './navBarObjects/logo.png';
import BurgerIcon from './BurgerIcon';
import '../../../../assets/css/flaticon.css';

const MENU_ITEMS = ['Home', 'Service', 'Feature', 'Pricing', 'Testimonial', 'FAQ'];

const Container1 = styled.div`
  min-height: 70px;
  display: block;
  min-height: 56px;
`;

const Container2 = styled.div`
  padding: 30px;
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
  @media (min-width: 1220px) {
    max-width: 1170px;
    width: 100%;
  }
`;

const Container3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${breakpoints.large}) {
    justify-content: flex-start;
  }
  width: 100%;
`;

const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  margin-right: 1rem;
`;

const Image = styled.img`
  display: block;
  max-width: 130px;
  height: auto;
  @media (min-width: ${breakpoints.large}) {
    margin-right: 166px;
  }
`;

const DesktopScrollspy = styled(Scrollspy)`
  margin-bottom: 0;
  padding-left: 0;
  li {
    list-style-type: none;
    display: inline-block;
    padding-left: 13px;
    padding-right: 13px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    &.is-current {
      a {
        color: ${colors.cinnabar};
      }
    }
    a {
      padding: 5px;
      font-size: 16px;
      font-weight: 400;
      color: ${colors.brightGray};
      transition: 0.15s ease-in-out;
      &:hover {
        color: ${colors.cinnabar};
      }
    }
  }
  @media (max-width: ${breakpoints.large}) {
    display: none;
  }
`;

const MobileScrollSpy = styled(Scrollspy)`
  margin-bottom: 40px;
  flex-grow: 1;
  @media (max-width: ${breakpoints.medium}) {
    margin-bottom: 30px;
  }
  li {
    list-style-type: none;
    margin-bottom: 35px;
    @media (max-width: ${breakpoints.medium}) {
      margin-bottom: 25px;
    }
    a {
      font-size: 20px;
      font-weight: 400;
      color: ${colors.brightGray};
      position: relative;
      transition: 0.15s ease-in-out;
      @media (max-width: ${breakpoints.medium}) {
        font-size: 18px;
      }
      &:hover {
        color: ${colors.cinnabar};
      }
      &:before {
        content: '';
        width: 7px;
        height: 7px;
        background: ${colors.cinnabar};
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: -15px;
        transform: translateY(-50%);
        opacity: 0;
      }
    }
    &.is-current {
      a {
        color: ${colors.cinnabar};
        &:before {
          opacity: 1;
        }
      }
    }
  }
`;

const DrawerClose = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: ${breakpoints.medium}) {
    top: 15px;
    right: 15px;
  }
  &:before {
    content: '\f10b';
    font-family: Flaticon;
    font-size: 26px;
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
  const menuItems = MENU_ITEMS.map((item) => (
    <li key={item}>
      <AnchorLink href="#" offset="-70">
        {item}
      </AnchorLink>
    </li>
  ));
  return (
    <Container1>
      <Container2>
        <Container3>
          <Link>
            <Image src={Logo} alt="Agency" />
          </Link>
          <DesktopScrollspy items={MENU_ITEMS}>{menuItems}</DesktopScrollspy>
          <RcDrawer
            width="420px"
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
              onKeyPress={() => {}}
            />
            <MobileScrollSpy items={MENU_ITEMS}>{menuItems}</MobileScrollSpy>
          </RcDrawer>
          <DrawerHandler
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            role="button"
            tabIndex="0"
            onKeyPress={() => {}}
          >
            <BurgerIcon />
          </DrawerHandler>
        </Container3>
      </Container2>
    </Container1>
  );
};

export default NavBar;
