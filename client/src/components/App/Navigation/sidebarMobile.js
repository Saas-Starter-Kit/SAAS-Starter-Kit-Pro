import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import useOutsideClick from '../../../hooks/useOutsideClick';
import { colors, breakpoints } from '../../../styles/theme';

import MobileSidebarItem from './mobileSidebarItem';
import Cross from '../svgs/cross';
import LargeLogo from '../../Common/svgs/LargeLogo';
import { THEMES } from '../AppLayout';
import {
  FcBarChart,
  FcCollect,
  FcConferenceCall,
  FcGenealogy,
  FcTimeline,
  FcUpload,
  FcPrivacy,
  FcEngineering
} from 'react-icons/fc';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 40;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const FixedDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.gray600};
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
`;

const showMobileSidebar = keyframes`
  from {
    transform: scaleX(0);
    transform-origin: left center;
  }
  to {
    transform: scaleX(100%);
    transform-origin: left center;
  }
`;

const Wrapper3 = styled.div`
  animation: ${showMobileSidebar} 0.5s ease-in-out;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  max-width: 256px;
  width: 100%;
  background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.midnight : colors.white)};
`;

const Sidebar = styled.div`
  flex: 1 1 0%;
  height: 0;
  padding-bottom: 1rem;
  overflow-y: auto;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -3.5rem;
  padding: 0.25rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  &:hover {
    background-color: ${colors.gray600};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
  height: 72px;
`;

const StyledLogo = styled(LargeLogo)`
  width: 150px;
`;

const Nav = styled.nav`
  padding: 24px 0;
`;

const ShrinkDiv = styled.div`
  flex-shrink: 0;
`;

const Wrapper4 = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: calc(100% - 55px);
  overflow: hidden;
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  overflow: hidden;
  transition: all 0.3s;

  span {
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }

  .anticon {
    min-width: 14px;
    margin-right: 4px;
    font-size: 14px;
  }
`;

const Bulb = styled(BulbOutlined)`
  color: ${colors.doveGray};
`;

const Span = styled.span`
  color: ${colors.doveGray};
`;

const SidebarMobile = ({ toggleMobileMenu, org_id, theme, toggleTheme }) => {
  const ref = useRef();
  useOutsideClick(ref, () => toggleMobileMenu(false));

  return (
    <Wrapper>
      <FixedDiv>
        <AbsoluteDiv />
      </FixedDiv>
      <Wrapper3 ref={ref} theme={theme}>
        <ButtonWrapper>
          <Button onClick={() => toggleMobileMenu(false)} aria-label="Close sidebar">
            <Cross />
          </Button>
        </ButtonWrapper>
        <Sidebar>
          <LogoWrapper>
            <StyledLogo
              textColor={theme === THEMES.DARK ? colors.white : colors.indigo400}
              alt="Workflow"
            />
          </LogoWrapper>
          <Wrapper4>
            <Nav>
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/dashboard`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcBarChart />}
                title="Dashboard"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/readupdate`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcCollect />}
                title="Read Update"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/create`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcUpload />}
                title="Create"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/permissions`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcPrivacy />}
                title="Permissions"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/users`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcConferenceCall />}
                title="Users"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/onboarding`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcTimeline />}
                title="Onboarding"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/machinelearning`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcGenealogy />}
                title="Machine Learning"
              />
              <MobileSidebarItem
                theme={theme}
                link={`/app/${org_id}/settings`}
                toggleMenu={() => toggleMobileMenu(false)}
                svg={<FcEngineering />}
                title="Settings"
              />
            </Nav>
            <Footer>
              <span>
                <Bulb />
                <Span theme={theme}>Switch Theme</Span>
              </span>
              <Switch
                onChange={toggleTheme}
                defaultChecked={theme === THEMES.DARK}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </Footer>
          </Wrapper4>
        </Sidebar>
      </Wrapper3>
      {/*<!-- Force sidebar to shrink to fit close icon -->*/}
      <ShrinkDiv />
    </Wrapper>
  );
};

export default SidebarMobile;
