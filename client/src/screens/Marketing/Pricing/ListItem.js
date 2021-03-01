import React from 'react';
import styled from 'styled-components';
import Tick from '../../../components/Marketing/svgs/tick';
import { colors } from '../../../styles/theme';

const StyledTick = styled.div`
  margin-top: -1rem;
  color: ${colors.green500};
  height: 1.5rem;
  width: 1.5rem;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const Paragraph = styled.p`
  color: ${colors.gray500};
  margin-left: 0.75rem;
  line-height: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
`;

const ListItem = ({ text }) => (
  <Item>
    <Wrapper>
      <StyledTick>
        <Tick />
      </StyledTick>
    </Wrapper>
    <Paragraph>{text}</Paragraph>
  </Item>
);

export default ListItem;
