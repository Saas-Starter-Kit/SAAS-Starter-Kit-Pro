import React from 'react';
import styled from 'styled-components';
import Tick from '../../../components/Marketing/svgs/tick';
import { colors } from '../../../styles/theme';

const Item = styled.li`
  display: flex;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  flex-shrink: 0;
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
      <Tick />
    </Wrapper>
    <Paragraph>{text}</Paragraph>
  </Item>
);

export default ListItem;
