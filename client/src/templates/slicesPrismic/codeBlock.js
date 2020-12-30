import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding-bottom: 2rem;
`;

const CodeBlock = ({ input }) => (
  <Content dangerouslySetInnerHTML={{ __html: input.primary.code_block.html }} />
);

export default CodeBlock;
