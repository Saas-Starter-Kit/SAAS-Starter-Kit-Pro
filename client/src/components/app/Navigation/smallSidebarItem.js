import { Link } from '@reach/router';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: ${colors.indigo300};
  border-radius: 0.375rem;
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
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const SmallSidebarItem = ({ id, title, link, svg }) => (
  <div data-tip data-for={id}>
    <Link to={link}>
      <SvgWrapper>{svg}</SvgWrapper>
    </Link>
    <ReactTooltip id={id} place='right' effect='solid'>
      {title}
    </ReactTooltip>
  </div>
);

export default SmallSidebarItem;
