import styled from 'styled-components';

const Svg = styled.svg`
  height: 1.25rem;
  width: 1.25rem;
`;

const ArrowDown = ({ className }) => (
  <Svg className={className} fill='currentColor' viewBox='0 0 20 20'>
    <path
      fill-rule='evenodd'
      d='M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
      clip-rule='evenodd'
    />
  </Svg>
);

export default ArrowDown;
