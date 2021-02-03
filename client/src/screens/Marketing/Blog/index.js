import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import RecentlyPublished from './recentlyPublished';
import Featured from './featured';
import TagsSection from './tagsSection';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.03em;
`;

const ColumnsWrapper = styled.div`
  background-color: ${colors.alabaster2};
`;

const Columns = styled.div`
  max-width: ${breakpoints.large};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 4rem 2rem 0;
`;

const FirstColumn = styled.div`
  flex-basis: 66%;
  @media (max-width: ${breakpoints.medium}) {
    flex-basis: 100%;
  }
`;

const SecondColumn = styled.div`
  padding-left: 4rem;
  flex-basis: 33%;
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const Blog = () => {
  const data = useStaticQuery(staticQuery);
  const { allPrismicPost } = data;
  const { edges } = allPrismicPost;

  const blogLinks = edges;
  const featuredArticle = edges.filter((edge) => edge.node.tags.includes('featured'));
  const topArticles = edges.filter((edge) => edge.node.tags.includes('top article'));
  const allTags = edges.map((edge) => edge.node.tags).flat();
  const uniqueTags = allTags.filter((value, index) => allTags.indexOf(value) === index);

  return (
    <Wrapper>
      <Featured article={featuredArticle[0]} />
      <ColumnsWrapper>
        <Columns>
          <FirstColumn>
            <RecentlyPublished blogLinks={blogLinks} />
          </FirstColumn>
          <SecondColumn>
            <TagsSection tags={uniqueTags} />
          </SecondColumn>
        </Columns>
      </ColumnsWrapper>
    </Wrapper>
  );
};

export default Blog;

const staticQuery = graphql`
  query BlogAll {
    allPrismicPost {
      edges {
        node {
          uid
          tags
          data {
            title {
              text
            }
            date
            hero_image {
              thumbnails {
                Table {
                  alt
                  url
                }
                desktop {
                  url
                  alt
                }
                mobile {
                  alt
                  url
                }
                thumbnail {
                  alt
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
