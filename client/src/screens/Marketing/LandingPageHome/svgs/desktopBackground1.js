import styled from 'styled-components';
import { colors, breakpoints, transform } from '../../../../styles/theme';

const Svg = styled.svg`
  display: none;
  position: absolute;
  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
  left: 100%;
  ${transform}
  --transform-translate-x: -50%;
  --transform-translate-y: -25%;
`;

const Rect = styled.rect`
  color: ${colors.gray200};
`;

const DesktopBackground1 = () => (
  <Svg width='404' height='784' fill='none' viewBox='0 0 404 784'>
    <defs>
      <pattern
        id='b1e6e422-73f8-40a6-b5d9-c8586e37e0e7'
        x='0'
        y='0'
        width='20'
        height='20'
        patternUnits='userSpaceOnUse'
      >
        <Rect x='0' y='0' width='4' height='4' fill='currentColor' />
      </pattern>
    </defs>
    <rect width='404' height='784' fill='url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)' />
  </Svg>
);

export default DesktopBackground1;
