import React from 'react';
import styled from 'styled-components';
import Stats from './stats';
import ActivityList from './activityList';
import { colors } from '../../../styles/theme';
import LineBarAreaComposedChart from './Charts/LineBarAreaComposedChart';
import TwoLevelPieChart from './Charts/TwoLevelPieChart';
import AreaChartFillByValue from './Charts/AreaChartFillByValue';
import SimpleBarChart from './Charts/SimpleBarChart';

const Title = styled.h1`
  font-weight: 600;
  color: ${colors.gray900};
  font-size: 1.5rem;
`;

const Dashboard = () => (
  <div>
    <div>
      <Title>Dashboard</Title>
      <Stats />
      <LineBarAreaComposedChart />
      <TwoLevelPieChart />
      <AreaChartFillByValue />
      <SimpleBarChart />
      <ActivityList />
    </div>
  </div>
);

export default Dashboard;
