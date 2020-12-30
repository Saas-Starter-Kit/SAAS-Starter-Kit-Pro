import React from 'react';
import styled from 'styled-components';

const Content = styled.div``;

const BodyContent = ({ slice }) => <div>{console.log(slice)}</div>;
//<Content dangerouslySetInnerHTML={{ __html: input.primary.text.html }} />

export default BodyContent;
