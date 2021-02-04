import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

const Title = styled.h2`
  line-height: 1.5715;
  font-weight: 700;
  margin-bottom: 2rem;
  @media (min-width: ${breakpoints.medium}) {
    margin-bottom: 3.5rem;
  }
`;

export default Title;
