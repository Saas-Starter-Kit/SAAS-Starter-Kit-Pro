import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import RecentlyPublished from './recentlyPublished';
import Featured from './featured';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.03em;
`;

const Blog = () => {
  const data = useStaticQuery(staticQuery);
  const { allPrismicPost } = data;
  const { edges } = allPrismicPost;

  const blogLinks = edges;

  let featuredArticle = edges.filter((edge) => edge.node.tags.includes('featured'));
  featuredArticle = featuredArticle[0];

  let topArticles = edges.filter((edge) => edge.node.tags.includes('top article'));

  return (
    <Wrapper>
      <Featured article={featuredArticle} />
      <RecentlyPublished blogLinks={blogLinks} />
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
