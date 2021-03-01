import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  height: 1.25rem;
  width: 1.25rem;
`;

const ArrowUp = ({ className }) => (
  <Svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ArrowUp;
