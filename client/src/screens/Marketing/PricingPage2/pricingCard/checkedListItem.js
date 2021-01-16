import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import CheckCircleSvg from './checkCircle.svg';

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  @media (min-width: ${breakpoints.large}) {
    grid-column: span 1 / span 1;
  }
`;

const Wrapper = styled.div`
  flex-shrink: 0;
`;

const CheckCircle = styled.img`
  height: 1.25rem;
  width: 1.25rem;
`;

const Paragraph = styled.p`
  color: ${colors.gray700};
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-left: 0.75rem;
`;

const CheckedListItem = ({ children }) => (
  <ListItem>
    <Wrapper>
      <CheckCircle src={CheckCircleSvg} />
    </Wrapper>
    <Paragraph>{children}</Paragraph>
  </ListItem>
);

export default CheckedListItem;
