import React from 'react';
import styled from 'styled-components';

const CautionQuote = styled.blockquote`
  color: red;
`;

const WarningBlock = ({ slice }) => {
  const warning = slice.primary.warningblock.text;
  console.log(warning);
  return <CautionQuote>{warning}</CautionQuote>;
};

export default WarningBlock;
