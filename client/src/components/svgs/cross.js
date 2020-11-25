import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Svg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  color: ${colors.white};
`;

const Cross = () => (
  <Svg stroke='currentColor' fill='none' viewBox='0 0 24 24'>
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      d='M6 18L18 6M6 6l12 12'
    />
  </Svg>
);

export default Cross;
