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

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  background-color: ${colors.white};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-top: 1.25rem;
  padding: 1rem;
`;

const Dashboard = () => (
  <div>
    <div>
      <Title>Dashboard</Title>
      <Stats />
      <ChartsContainer>
        <LineBarAreaComposedChart />
        <TwoLevelPieChart />
        <AreaChartFillByValue />
        <SimpleBarChart />
      </ChartsContainer>
      <ActivityList />
    </div>
  </div>
);

export default Dashboard;
