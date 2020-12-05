import React from 'react';
import styled from 'styled-components';
import Stats from './stats';
import ActivityList from './activityList';
import { colors } from '../../styles/theme';
import Layout from '../../components/Layout';

const Title = styled.h1`
  font-weight: 600;
  color: ${colors.gray900};
  font-size: 1.5rem;
`;

const Dashboard = () => (
  <Layout>
    <Title>Dashboard</Title>
    <Stats />
    <ActivityList />
  </Layout>
);

export default Dashboard;
