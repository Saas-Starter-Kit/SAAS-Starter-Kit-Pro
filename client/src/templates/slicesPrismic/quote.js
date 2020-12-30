import React from 'react';
import styled from 'styled-components';

const BlockQuote = styled.blockquote``;

const Quote = ({ slice }) => <BlockQuote>{console.log(slice)}</BlockQuote>;

export default Quote;
