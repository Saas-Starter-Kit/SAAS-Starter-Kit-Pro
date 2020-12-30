import React from 'react';
import styled from 'styled-components';

const BlockQuote = styled.blockquote``;

const Quote = ({ slice }) => {
  const quote = slice.primary.quote.text;
  return <BlockQuote>{quote}</BlockQuote>;
};

export default Quote;
