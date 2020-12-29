import React from 'react';
import { graphql } from 'gatsby';

const Docs = ({ data: { prismicPost } }) => {
  const { data } = prismicPost;

  console.log(data);
  return (
    <React.Fragment>
      {/*<h1>{data.title.text}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.text.html }} />*/}
    </React.Fragment>
  );
};

export default Docs;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicDocs(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
      }
    }
  }
`;
