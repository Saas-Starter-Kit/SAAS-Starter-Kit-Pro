import styled from 'styled-components';
import { colors } from '../../styles/theme';
import DesktopActivityList from './desktopActivityList';
import MobileActivityList from './mobileActivityList';

const Wrapper1 = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: ${colors.coolGray100};
`;

const Wrapper2 = styled.div`
  flex: 1 1 0%;
  overflow: auto;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const Main = styled.main`
  flex: 1 1 0%;
  position: relative;
  padding-bottom: 2rem;
  z-index: 0;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.coolGray900};
`;

const ActivityList = () => (
  <Wrapper1>
    <Wrapper2 tabindex='0'>
      <Main>
        <Title>Recent activity</Title>
        <DesktopActivityList />
        <MobileActivityList />
      </Main>
    </Wrapper2>
  </Wrapper1>
);

export default ActivityList;
