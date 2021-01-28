import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SliceZone from './sliceZone';
import DocsSidebar from '../screens/Marketing/Docs/docsSidebar';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 200px;
`;

const Content = styled.div`
  width: calc(100% - 200px);
  padding: 1rem 3vw;
`;

const Docs = ({ data }) => {
  const title = data.prismicDocs.data.title.text;
  const body = data.prismicDocs.data.body;

  return (
    <Wrapper>
      <Sidebar>
        <DocsSidebar />
      </Sidebar>
      <Content>
        <h1>{title}</h1>
        <div style={{ borderRadius: '3rem' }}>
          <SliceZone body={body} />
        </div>
      </Content>
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
          ... on PrismicDocsBodyWarningblock {
            id
            slice_type
            primary {
              warningblock {
                text
              }
            }
          }
        }
      }
    }
  }
`;
