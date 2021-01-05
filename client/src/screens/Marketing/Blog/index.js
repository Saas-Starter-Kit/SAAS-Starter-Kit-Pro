import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Blog = () => {
  const data = useStaticQuery(staticQuery);
  const { allPrismicPost } = data;
  const { edges } = allPrismicPost;

  const blogLinks = edges;

  let featuredArticle = edges.filter((edge) => edge.node.tags.includes('featured'));
  featuredArticle = featuredArticle[0];

  let topArticles = edges.filter((edge) => edge.node.tags.includes('top article'));
  console.log(topArticles);

  return (
    <Wrapper>
      <div>
        <h3>Featured:</h3>
      </div>
      <div>
        <h3>Top Articles:</h3>
      </div>
      <h3>Recent Articles</h3>
      {blogLinks.map((blogLink) => (
        <div>
          <Link to={`/blog/${blogLink.node.uid}`}>{blogLink.node.data.title.text}</Link>
          <p>{blogLink.node.data.date}</p>
        </div>
      ))}
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
