import React from 'react';
import { graphql } from 'gatsby';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SliceZone from './sliceZone';

const Docs = ({ data }) => {
  console.log(data);
  //const htmlCode = data.prismicDocs.data.body[2].primary.quote.html;
  //const htmlText = data.prismicDocs.data.body[0].primary.quote.text;

  console.log(data.prismicDocs.data);

  const body = data.prismicDocs.data.body;

  return (
    <React.Fragment>
      {/*<h1>{data.prismicDocs.data.title}</h1>*/}

      <div style={{ width: '80%', borderRadius: '3rem' }}>
        {/*<SyntaxHighlighter language="jsx" style={dark}>
          {htmlText}
        </SyntaxHighlighter>*/}
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
