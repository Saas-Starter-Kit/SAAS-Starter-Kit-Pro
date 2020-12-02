import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Wrapper = styled.div`
  cursor: pointer;
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  &:hover {
    color: ${colors.gray900};
    background-color: ${colors.gray100};
  }
  &:focus {
    color: ${colors.gray900};
    background-color: ${colors.gray100};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const DropdownItem = ({ onClick, title }) => (
  <Wrapper onClick={onClick} role='menuitem'>
    {title}
  </Wrapper>
);

export default DropdownItem;
