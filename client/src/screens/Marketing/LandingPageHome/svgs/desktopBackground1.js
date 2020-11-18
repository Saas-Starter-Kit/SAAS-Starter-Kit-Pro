import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';

const Svg = styled.svg`
  display: none;
  position: absolute;
  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
  left: 100%;
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y))
    rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))
    scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
  --transform-translate-x: -50%;
  --transform-translate-y: -25%;
`;

const Rect = styled.rect`
  color: ${colors.gray200};
`;

export default () => (
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
