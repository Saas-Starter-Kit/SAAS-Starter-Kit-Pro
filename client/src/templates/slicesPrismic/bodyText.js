import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div``;

const BodyText = ({ input }) => (
  <Content dangerouslySetInnerHTML={{ __html: input.primary.text.html }} />
);

export default BodyText;

BodyText.propTypes = {
  input: PropTypes.object.isRequired
};
