import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import moment from 'moment';
import SliceZone from './sliceZone';

const Wrapper = styled.div`
  margin: 3rem 7rem;
`;

const Post = ({ data }) => {
  const author = data.prismicPost.data.author.text;
  const date = moment(data.prismicPost.data.date).format('MMM Do YY');
  const title = data.prismicPost.data.title.text;
  const body = data.prismicPost.data.body;
  const tags = data.prismicPost.tags;

  console.log(tags);

  console.log(data.prismicPost.data);
  return (
    <Wrapper>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <h3>{date}</h3>
      <SliceZone body={body} />
    </Wrapper>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      tags
      data {
        author {
          text
        }
        body {
          ... on PrismicPostBodyCode {
            id
            slice_type
            primary {
              code {
                text
              }
            }
          }
          ... on PrismicPostBodyContent {
            id
            primary {
              content {
                html
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
            slice_type
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
