import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { colors } from '../../styles/theme';
import QuoteIconBlock from './quoteIconBlock';

const Quote = ({ slice }) => (
  <QuoteIconBlock
    icon={<AiOutlineInfoCircle size={20} />}
    background={colors.athensGray}
    accent={colors.opaqueViolet}
    text={slice.primary.quote.text}
  />
);

export default Quote;
