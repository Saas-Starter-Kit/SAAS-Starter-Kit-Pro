import styled from 'styled-components';
import { colors, breakpoints, transform } from '../../../../styles/theme';

const Svg = styled.svg`
  position: absolute;
  top: 100%;
  right: 100%;
  ${transform}
  --transform-translate-x: 33.333333%;
  --transform-translate-y: -25%;
  @media (min-width: ${breakpoints.large}) {
    --transform-translate-x: 50%;
  }
  @media (min-width: ${breakpoints.extraLarge}) {
    --transform-translate-y: -50%;
  }
`;

const Rect = styled.rect`
  color: ${colors.gray200};
`;

const TestimonialBackground = () => (
  <Svg
    width='404'
    height='404'
    fill='none'
    viewBox='0 0 404 404'
    role='img'
    aria-labelledby='svg-workcation'
  >
    <title id='svg-workcation'>Workcation</title>
    <defs>
      <pattern
        id='ad119f34-7694-4c31-947f-5c9d249b21f3'
        x='0'
        y='0'
        width='20'
        height='20'
        patternUnits='userSpaceOnUse'
      >
        <Rect x='0' y='0' width='4' height='4' fill='currentColor' />
      </pattern>
    </defs>
    <rect width='404' height='404' fill='url(#ad119f34-7694-4c31-947f-5c9d249b21f3)' />
  </Svg>
);

export default TestimonialBackground;
