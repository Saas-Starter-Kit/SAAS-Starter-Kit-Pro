import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { Link } from '@reach/router';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.indigo300};
  border-radius: 0.375rem;
  /*transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;*/
  &:hover {
    color: ${colors.white};
    background-color: ${(props) => props.theme.primaryHover};
  }
  &:focus {
    color: ${colors.white};
    background-color: ${(props) => props.theme.primaryHover};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const SvgWrapper = styled.div`
  margin-right: 0.75rem;
`;

const SidebarItem = ({ link, title, svg }) => (
  <Link to={link}>
    <ItemWrapper>
      <SvgWrapper>{svg}</SvgWrapper>
      {title}
    </ItemWrapper>
  </Link>
);

export default SidebarItem;
