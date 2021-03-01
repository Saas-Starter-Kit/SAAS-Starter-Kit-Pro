import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ slice }) => {
  const codeBlock = slice.primary.code.text;
  return (
    <SyntaxHighlighter customStyle={{ border: 'none' }} language="jsx" style={dark}>
      {codeBlock}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
