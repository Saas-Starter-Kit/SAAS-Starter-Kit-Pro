import styled from 'styled-components';
import { colors } from '../../../styles/theme';

export const BaseCard = styled.div`
  background-color: ${colors.white};
  border-radius: 1rem;
  margin: 0.5rem;
  box-shadow: 1px 1px 5px 0 rgb(1 1 1 / 5%);
  overflow: hidden;
`;

export const AnimatedCard = styled(BaseCard)`
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease, color 250ms ease;
  transition-property: transform, box-shadow, color;
  transition-duration: 250ms, 250ms, 250ms;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s;
  -webkit-transition: -webkit-transform 250ms ease, box-shadow 250ms ease, color 250ms ease;
  -webkit-transition: transform 250ms ease, box-shadow 250ms ease, color 250ms ease;
  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%);
  }
`;
