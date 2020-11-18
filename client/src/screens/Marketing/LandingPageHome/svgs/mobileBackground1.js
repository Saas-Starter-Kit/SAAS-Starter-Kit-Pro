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

const MobileBackground1 = () => (
  <Svg width='784' height='404' fill='none' viewBox='0 0 784 404'>
    <defs>
      <pattern
        id='ca9667ae-9f92-4be7-abcb-9e3d727f2941'
        x='0'
        y='0'
        width='20'
        height='20'
        patternUnits='userSpaceOnUse'
      >
        <Rect x='0' y='0' width='4' height='4' fill='currentColor' />
      </pattern>
    </defs>
    <rect width='784' height='404' fill='url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)' />
  </Svg>
);

export default MobileBackground1;
