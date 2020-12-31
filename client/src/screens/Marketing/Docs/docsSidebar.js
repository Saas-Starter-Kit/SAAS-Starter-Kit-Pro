import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//just use graphql and make welcome page
const DocsSidebar = () => {
  const data = useStaticQuery(staticQuery);
  const { allPrismicDocs } = data;
  const { edges } = allPrismicDocs;

  console.log(edges);
  const docsLinks = edges;

  return (
    <Wrapper>
      {docsLinks.map((docLink) => (
        <Link to={`/docs/${docLink.node.uid}`}>{docLink.node.data.title.text}</Link>
      ))}
    </Wrapper>
  );
};

export default DocsSidebar;

const staticQuery = graphql`
  query DocsAll {
    allPrismicDocs {
      edges {
        node {
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
  }
`;
