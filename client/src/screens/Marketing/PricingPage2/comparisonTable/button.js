import styled from 'styled-components';
import { colors } from '../../../../styles/theme';

const Button = styled.a`
  display: block;
  border: 1px solid ${colors.gray800};
  background-color: ${colors.gray800};
  border-radius: 0.375rem;
  text-align: center;
  color: ${colors.white};
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  &:hover {
    background-color: ${colors.gray900};
  }
`;

export default Button;
