import React from 'react';
import { graphql } from 'gatsby';

const Post = ({ data: { prismicPost } }) => {
  const { data } = prismicPost;

  console.log(data);
  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.text.html }} />*/}
    </React.Fragment>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        author {
          text
        }
        body {
          ... on PrismicPostBodyCode {
            id
            primary {
              code {
                text
              }
            }
            slice_type
          }
          ... on PrismicPostBodyContent {
            id
            primary {
              content {
                text
              }
            }
            slice_type
          }
          ... on PrismicPostBodyQuote {
            id
            primary {
              quote {
                text
              }
            }
          }
          ... on PrismicPostBodyFullwidthimage {
            id
          }
        }
        date
        title {
          text
        }
      }
    }
  }
`;
