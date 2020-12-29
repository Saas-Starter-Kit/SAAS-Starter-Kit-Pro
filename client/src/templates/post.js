import React from 'react';
import { graphql } from 'gatsby';

const Post = ({ data: { prismicPost } }) => {
  const { data } = prismicPost;

  console.log(data);
  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} />*/}
    </React.Fragment>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        text {
          html
        }
      }
    }
  }
`;
