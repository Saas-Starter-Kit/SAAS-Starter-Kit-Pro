import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { BaseCard } from './cards';
import Tag from './tag';
import Title from './sectionTitle';

const Card = styled(BaseCard)`
  display: flex;
  flex-flow: wrap;
  padding: 2rem;
  * {
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

const StyledTitle = styled(Title)`
  text-align: center;
  color: ${colors.slateGray};
`;

const TagsSection = ({ tags }) => (
  <React.Fragment>
    <StyledTitle>Tags</StyledTitle>
    <Card>
      {tags.map((tag, index) => (
        <Tag key={tag.concat(index)}>{`#${tag}`}</Tag>
      ))}
    </Card>
  </React.Fragment>
);

export default TagsSection;
