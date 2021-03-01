import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Svg = styled.svg`
  flex-shrink: 0;
  height: 1.25rem;
  width: 1.25rem;
  color: ${colors.coolGray400};
`;

const Cash = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Cash;
