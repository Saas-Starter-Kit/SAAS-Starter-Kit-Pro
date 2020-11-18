import styled from 'styled-components';
import { colors, breakpoints, transform } from '../../../../styles/theme';

const Svg = styled.svg`
  position: absolute;
  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
  left: 50%;
  ${transform}
  --transform-translate-x: -50%;
  --transform-translate-y: 4rem;
`;

const Rect = styled.rect`
  color: ${colors.gray200};
`;

const MobileBackground2 = () => (
  <Svg width='784' height='404' fill='none' viewBox='0 0 784 404'>
    <defs>
      <pattern
        id='e80155a9-dfde-425a-b5ea-1f6fadd20131'
        x='0'
        y='0'
        width='20'
        height='20'
        patternUnits='userSpaceOnUse'
      >
        <Rect x='0' y='0' width='4' height='4' fill='currentColor' />
      </pattern>
    </defs>
    <rect width='784' height='404' fill='url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)' />
  </Svg>
);

export default MobileBackground2;
