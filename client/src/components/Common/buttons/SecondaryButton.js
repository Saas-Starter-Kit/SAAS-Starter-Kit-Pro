import styled from 'styled-components';
import { ButtonBase } from './ButtonBase';
import { colors } from '../../../styles/theme';

export const SecondaryButton = styled(ButtonBase)`
  color: ${colors.royalBlue};
  background-color: ${colors.white};
  border: 1px solid ${colors.royalBlue20};
  font-size: 14px;
  min-width: 156px;
  margin-left: 18px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
