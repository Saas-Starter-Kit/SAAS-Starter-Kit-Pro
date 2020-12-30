import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding-bottom: 2rem;
`;

const CodeBlock = ({ slice }) => <div>{console.log(slice)}</div>;

export default CodeBlock;
