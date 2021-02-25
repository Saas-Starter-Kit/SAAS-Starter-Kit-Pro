import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import moment from 'moment';
import { colors, breakpoints } from '../../../styles/theme';
import { AnimatedCard } from './cards';
import Title from './sectionTitle';

const Wrapper = styled.div`
  margin-bottom: 4rem;
  min-width: 300px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  color: ${colors.slateGray};
`;

const Card = styled(AnimatedCard)`
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  border-left: 5px solid ${colors.sail};
  padding: 1rem;
`;

const Text = styled.div`
  color: ${colors.gray800};
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  @media (min-width: ${breakpoints.large}) {
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.large}) {
    flex-direction: column;
  }
`;

const Author = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.slateGray};
  padding-right: 0.5rem;
`;

const Date = styled.div`
  color: ${colors.cadetBlue};
  font-size: 12px;
  @media (min-width: ${breakpoints.large}) {
    text-align: right;
  }
`;

const RelatedArticles = ({ articles }) => (
  <Wrapper>
    <StyledTitle>Related Articles</StyledTitle>
    {articles.map(({ document: { data: { title: { text }, date }, uid } }, index) => (
      <Card
        key={uid}
        onClick={() => {
          navigate(`/blog/${uid}`);
        }}
      >
        <CardContent>
          <Text>{text}</Text>
          <Footer>
            <Author>ADD AUTHOR HERE</Author>
            <Date>{moment(date).format('MMMM DD, YYYY')}</Date>
          </Footer>
        </CardContent>
      </Card>
    ))}
  </Wrapper>
);

export default RelatedArticles;
