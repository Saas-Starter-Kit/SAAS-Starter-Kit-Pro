import React from 'react';
import { graphql } from 'gatsby';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Docs = ({ data }) => {
  console.log(data);
  //const htmlCode = data.prismicDocs.data.body[2].primary.quote.html;
  //const htmlText = data.prismicDocs.data.body[0].primary.quote.text;

  console.log(data.prismicDocs.data);

  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>*/}

      <div style={{ width: '80%', borderRadius: '3rem' }}>
        {/*<SyntaxHighlighter language="jsx" style={dark}>
          {htmlText}
        </SyntaxHighlighter>*/}
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
        body {
          ... on PrismicDocsBodyCode {
            id
            primary {
              code {
                text
                html
              }
            }
          }
        }
      }
    }
  }
`;
