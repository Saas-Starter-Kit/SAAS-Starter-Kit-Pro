import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SliceZone from './sliceZone';
import DocsSidebar from '../screens/Marketing/Docs/docsSidebar';

const Wrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 30%;
`;

const Docs = ({ data }) => {
  const title = data.prismicDocs.data.title.text;
  const body = data.prismicDocs.data.body;
  console.log(data);

  return (
    <Wrapper>
      <Sidebar>
        <DocsSidebar />
      </Sidebar>
      <div>
        <h1>{title}</h1>
        <div style={{ borderRadius: '3rem' }}>
          <SliceZone body={body} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Docs;

export const pageQuery = graphql`
  query DocsBySlug($uid: String!) {
    prismicDocs(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        body {
          ... on PrismicDocsBodyCode {
            id
            slice_type
            primary {
              code {
                text
              }
            }
          }
          ... on PrismicDocsBodyContent {
            id
            slice_type
            primary {
              content {
                html
              }
            }
          }
          ... on PrismicDocsBodyQuote {
            id
            slice_type
            primary {
              quote {
                text
              }
            }
          }
        }
      }
    }
  }
`;
