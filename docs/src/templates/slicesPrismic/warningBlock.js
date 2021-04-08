import React from 'react';
import { FcHighPriority } from 'react-icons/fc';
import { colors } from '../../styles/theme';
import QuoteIconBlock from './quoteIconBlock';

const WarningBlock = ({ slice }) => {
  const warning = slice.primary.warningblock.text;
  console.log(warning);
  return (
    <QuoteIconBlock
      icon={<FcHighPriority size={20} />}
      background={colors.lavenderBlush}
      accent={colors.roman}
      text={warning}
    />
  );
};

export default WarningBlock;
