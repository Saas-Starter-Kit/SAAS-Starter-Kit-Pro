import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Wrapper = styled.div`
  p {
    color: ${colors.slateGray};
    font-size: 1rem;
  }
`;

const BodyContent = ({ slice }) => {
  const content = slice.primary.content.html;
  return <Wrapper dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BodyContent;
