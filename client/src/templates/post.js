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
  //const hero_image =
  const body = data.prismicPost.data.body;

  const tags = data.prismicPost.tags;
  const related_article1 = data.prismicPost.data.related_article1;
  const related_article2 = data.prismicPost.data.related_article2;
  const related_articles = [related_article1, related_article2];

  console.log(related_articles);

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
        title {
          text
        }
        date
        author {
          text
        }
        hero_image {
          thumbnails {
            Table {
              url
            }
            desktop {
              url
            }
            mobile {
              url
            }
            thumbnail {
              url
            }
          }
        }
        related_article1 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
        }
        related_article2 {
          document {
            ... on PrismicPost {
              id
              data {
                hero_image {
                  url
                }
                title {
                  text
                }
                date
              }
            }
          }
          tags
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
          ... on PrismicPostBodyFullwidthimage {
            id
            primary {
              image {
                thumbnails {
                  Table {
                    url
                  }
                  desktop {
                    url
                  }
                  mobile {
                    url
                  }
                  thumbnail {
                    url
                  }
                }
              }
            }
            slice_type
          }
        }
      }
    }
  }
`;
