import styled from 'styled-components';
import { ButtonBase } from './ButtonBase';
import {
  landingPage2Colors as colors,
  landingPage2Breakpoints as breakpoints
} from '../../../styles/theme';

export const PrimaryButton = styled(ButtonBase)`
  color: ${colors.white};
  background-color: ${colors.royalBlue};
  border: 1px solid transparent;
  font-size: 13px;
  @media (min-width: ${breakpoints.small}) {
    font-size: 14px;
  }
  min-width: 120px;
  @media (min-width: ${breakpoints.large}) {
    min-width: 156px;
  }
  &:hover,
  &:active,
  &:focus {
    border: 1px solid transparent;
    outline: none;
    box-shadow: 0px 9px 20px -5px rgba(82, 104, 219, 0.57);
    background-image: linear-gradient(
      31deg,
      rgba(215, 178, 233, 0.4) 0%,
      rgba(83, 105, 220, 0.4) 100%
    );
  }
`;
