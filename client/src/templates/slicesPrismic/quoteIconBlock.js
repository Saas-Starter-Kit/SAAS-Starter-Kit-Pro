import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const BlockQuote = styled.blockquote`
  flex-grow: 1;
  margin: 1rem 0 1rem 1rem;
  padding: 1px 2rem;
  background-color: ${({ background }) => background};
  border-left: 0.25rem solid ${({ accent }) => accent};
`;

const Paragraph = styled.p`
  margin: 1em 0;
`;

const QuoteIconBlock = ({ icon, text, accent, background }) => (
  <Container>
    {icon}
    <BlockQuote accent={accent} background={background}>
      <Paragraph>{text}</Paragraph>
    </BlockQuote>
  </Container>
);

export default QuoteIconBlock;
