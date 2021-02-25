import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Svg = styled.svg`
  color: ${colors.indigo400};
  height: 1.5rem;
  width: 1.5rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    color: ${colors.indigo300};
  }
`;

const Persons = ({ className }) => (
  <div className={className}>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </Svg>
  </div>
);

export default Persons;
