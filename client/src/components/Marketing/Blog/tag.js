import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Tag = styled.div`
  font-size: 10px;
  white-space: nowrap;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  vertical-align: middle;
  padding: 0.225rem 0.9rem;
  line-height: 1.3rem;
  background-color: ${colors.gray200};
  color: ${colors.gray600};
  &:hover {
    color: ${colors.gray200};
    background-color: ${colors.slateGray};
  }
  cursor: pointer;
`;

export default Tag;
