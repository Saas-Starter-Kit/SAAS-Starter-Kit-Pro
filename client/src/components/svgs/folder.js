import styled from 'styled-components';
import { colors } from '../../styles/theme';

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

const Folder = () => (
  <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
    />
  </Svg>
);

export default Folder;
