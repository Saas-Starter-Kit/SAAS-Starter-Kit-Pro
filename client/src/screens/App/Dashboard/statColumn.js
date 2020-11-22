import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  padding: 1.25rem 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding: 1.5rem;
  }
`;

const Dt = styled.dt`
  color: ${colors.gray900};
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const Dd = styled.dd`
  margin-top: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
  @media (min-width: ${breakpoints.large}) {
    display: flex;
  }
`;

const Number = styled.div`
  display: flex;
  align-items: baseline;
  color: ${colors.indigo600};
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const InitialNumber = styled.span`
  color: ${colors.gray500};
  font-weight: 500;
  line-height: 1.25rem;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const Description = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: baseline;
  color: ${({ pillTextColor }) => pillTextColor};
  background-color: ${({ pillColor }) => pillColor};
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.125rem 0.625rem;
  @media (min-width: ${breakpoints.medium}) {
    margin-top: 0.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-top: 0;
  }
`;

const StatColumn = ({
  title,
  number,
  initialNumber,
  svg,
  diffDescription,
  diff,
  pillTextColor,
  pillColor
}) => (
  <Wrapper>
    <dl>
      <Dt>{title}</Dt>
      <Dd>
        <Number>
          {number}
          <InitialNumber>{initialNumber}</InitialNumber>
        </Number>
        <Pill pillTextColor={pillTextColor} pillColor={pillColor}>
          {svg}
          <Description>{diffDescription}</Description>
          {diff}
        </Pill>
      </Dd>
    </dl>
  </Wrapper>
);

export default StatColumn;
