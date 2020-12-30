import React from 'react';
import styled from 'styled-components';

const BlockQuote = styled.blockquote``;

const Quote = ({ input }) => (
  <BlockQuote>
    <div dangerouslySetInnerHTML={{ __html: input.primary.quote.html }} />
  </BlockQuote>
);

export default Quote;
