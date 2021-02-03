import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { colors, breakpoints } from '../../../styles/theme';
import ArticleCard from './articleCard';

const Wrapper1 = styled.div`
  background-color: ${colors.alabaster2};
`;

const Wrapper2 = styled.div`
  padding: 4rem 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: ${breakpoints.large};
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  color: ${colors.gray800};
  margin-bottom: 3.5rem;
  line-height: 1.5715;
  font-weight: 700;
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
  <Wrapper1>
    <Wrapper2>
      <Title>Recently Published</Title>
      {blogLinks.map(({ node: { data, tags, uid } }) => (
        <ArticleCard
          title={data.title.text}
          date={moment(data.date).format('MMMM DD, YYYY')}
          imageSrc={data.hero_image.thumbnails.thumbnail.url}
          uid={uid}
          tags={tags}
        />
      ))}
    </Wrapper2>
  </Wrapper1>
);

export default RecentlyPublished;
