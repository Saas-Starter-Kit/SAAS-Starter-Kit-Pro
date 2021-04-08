import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { colors } from '../../styles/theme';
import ArticleCard from './articleCard';
import Title from './sectionTitle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  color: ${colors.gray800};
  &:before {
    margin-right: calc(2rem - 5px);
    content: '';
    background-color: ${colors.gray200};
    height: 28px;
    width: 5px;
    border-radius: 9999px;
    display: inline-block;
    vertical-align: -25%;
  }
`;

const RecentlyPublished = ({ blogLinks }) => (
  <Wrapper>
    <StyledTitle>Recently Published</StyledTitle>
    {blogLinks.map(({ node: { data, tags, uid } }) => (
      <ArticleCard
        key={uid.concat(data.title.text)}
        title={data.title.text}
        date={moment(data.date).format('MMMM DD, YYYY')}
        imageSrc={data.hero_image.thumbnails.thumbnail.url}
        uid={uid}
        tags={tags}
      />
    ))}
  </Wrapper>
);

export default RecentlyPublished;
