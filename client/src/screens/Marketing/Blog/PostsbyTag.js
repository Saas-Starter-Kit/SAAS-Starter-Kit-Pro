import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import moment from 'moment';
import SEO from '../../../components/Marketing/Layout/seo';
import ArticleCard from '../../../components/Marketing/Blog/articleCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 34rem;
  margin: 1rem;
  padding-bottom: 3rem;
`;

const StyledHeader = styled.h3`
  margin-left: 1rem;
`;

const PostsbyTag = () => {
  const data = useStaticQuery(staticQuery);
  const location = useLocation();
  const { allPrismicPost } = data;
  const { edges } = allPrismicPost;
  const tag = location.search.split('=')[1];

  let Posts = edges.filter((edge) => edge.node.tags.includes(tag));

  const seoData = {
    title: 'Saas Starter Kit Pro Tags page',
    description: 'Saas Starter Pro Kit Tags page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <StyledHeader>Showing Results for tag: {tag}</StyledHeader>
        {Posts.map(({ node: { data, tags, uid } }) => (
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
    </React.Fragment>
  );
};

export default PostsbyTag;

const staticQuery = graphql`
  query PostsbyTag {
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
