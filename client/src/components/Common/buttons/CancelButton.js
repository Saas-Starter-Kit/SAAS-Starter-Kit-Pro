import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const CancelButton = styled.button`
  color: black;
  background-color: ${colors.white};
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  margin: 1rem 0 1rem 0;
  transition-duration: 0.4s;
  overflow: hidden;
  width: 8rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }
`;

export default CancelButton;
