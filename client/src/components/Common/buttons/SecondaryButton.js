import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const SecondaryButton = styled.button`
  position: relative;
  color: ${colors.white};
  background-color: #1565c0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  margin: 1rem 0 1rem 0;
  transition-duration: 0.4s;
  overflow: hidden;
  width: 8rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }

  &:focus {
    box-shadow: 0 0 0 3px lightblue;
    outline-width: 1px;
    outline-color: lightblue;
  }
`;

export default SecondaryButton;
