import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useLocation } from '@reach/router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostsbyTag = () => {
  const data = useStaticQuery(staticQuery);
  const location = useLocation();
  const { allPrismicPost } = data;
  const { edges } = allPrismicPost;
  const tag = location.search.split('=')[1];

  console.log(tag);

  let Posts = edges.filter((edge) => edge.node.tags.includes(tag));

  return (
    <Wrapper>
      <h3>Showing Results for tag: {tag}</h3>
      {Posts.map((post) => (
        <div>
          <Link to={`/blog/${post.node.uid}`}>{post.node.data.title.text}</Link>
          <p>{post.node.data.date}</p>
        </div>
      ))}
    </Wrapper>
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
