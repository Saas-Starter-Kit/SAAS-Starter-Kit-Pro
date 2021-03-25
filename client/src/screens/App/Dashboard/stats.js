import React from 'react';
import styled, { css } from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import StatColumn from './statColumn';
import ArrowUp from '../../../components/App/svgs/arrowUp';
import ArrowDown from '../../../components/App/svgs/arrowDown';

const Title = styled.h2`
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const Card = styled.div`
  background-color: ${colors.white};
  overflow: hidden;
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const BorderDiv = styled.div`
  @media (min-width: ${breakpoints.medium}) {
    border-left: 1px solid ${colors.gray200};
  }
  @media (max-width: ${breakpoints.medium}) {
    border-top: 1px solid ${colors.gray200};
  }
`;

const arrowStyles = css`
  margin-left: -0.25rem;
  margin-right: 0.125rem;
  flex-shrink: 0;
  align-self: center;
`;

const StyledArrowUp = styled(ArrowUp)`
  color: ${colors.green500};
  ${arrowStyles}
`;

const StyledArrowDown = styled(ArrowDown)`
  color: ${colors.red500};
  ${arrowStyles}
`;

const Stats = () => (
  <React.Fragment>
    <Title>Last 30 days</Title>
    <Card>
      <div>
        <StatColumn
          title="Total Subscribers"
          number={71897}
          svg={<StyledArrowUp />}
          diffDescription="Increased by"
          diff="12%"
          pillColor={colors.green100}
          pillTextColor={colors.green800}
        />
      </div>
      <BorderDiv>
        <StatColumn
          title="Total Purchases"
          number={12333}
          svg={<StyledArrowUp />}
          diffDescription="Increased by"
          diff="2.02%"
          pillColor={colors.green100}
          pillTextColor={colors.green800}
        />
      </BorderDiv>
      <BorderDiv>
        <StatColumn
          title="Total Views"
          number={23235}
          svg={<StyledArrowDown />}
          diffDescription="Decreased by"
          diff="4.05%"
          pillColor={colors.red100}
          pillTextColor={colors.red800}
        />
      </BorderDiv>
    </Card>
  </React.Fragment>
);

export default Stats;
