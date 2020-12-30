import React from 'react';
import { graphql } from 'gatsby';
import SliceZone from './sliceZone';

const Docs = ({ data }) => {
  const title = data.prismicDocs.data.title.text;
  const body = data.prismicDocs.data.body;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <div style={{ width: '80%', borderRadius: '3rem' }}>
        <SliceZone body={body} />
      </div>
    </React.Fragment>
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
