import React from 'react';
import { graphql } from 'gatsby';
//import Markdown from 'react-markdown';
import { RichText } from 'prismic-reactjs';
import Prism from 'prismjs';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

//Prism.highlightAll();

const Docs = ({ data }) => {
  console.log(data);
  const htmlCode = data.prismicDocs.data.body[2].primary.quote.html;
  const htmlText = data.prismicDocs.data.body[2].primary.quote.text;
  const rawMarkdown = RichText.asText(htmlText);

  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>*/}
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
      <code>{htmlText}</code>
      {/*<Markdown source={htmlText} />*/}
      <Highlight {...defaultProps} code={htmlText} language="javascript">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </React.Fragment>
  );
};

export default Docs;

export const pageQuery = graphql`
  query DocsBySlug($uid: String!) {
    prismicDocs(uid: { eq: $uid }) {
      uid
      data {
        author {
          link_type
        }
        body {
          ... on PrismicDocsBodyCodeSnippet {
            id
            primary {
              quote {
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
