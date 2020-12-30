import React from 'react';
import styled from 'styled-components';

const BodyContent = ({ slice }) => {
  const content = slice.primary.content.html;
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BodyContent;
