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

  return (
    <Wrapper>
      <div>
        <h3>Featured:</h3>
        {/*hardcode*/}
      </div>
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
          data {
            title {
              text
            }
            date
          }
        }
      }
    }
  }
`;
