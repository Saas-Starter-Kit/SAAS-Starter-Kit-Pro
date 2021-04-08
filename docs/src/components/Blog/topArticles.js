import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { FaRegLightbulb } from 'react-icons/fa';
import { colors } from '../../styles/theme';
import { BaseCard } from './cards';
import Title from './sectionTitle';

const Wrapper = styled.div`
  margin-bottom: 4rem;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  color: ${colors.slateGray};
`;

const Card = styled(BaseCard)`
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    div {
      background-color: ${colors.cornflowerBlue};
      * {
        color: ${colors.white};
      }
    }
  }
`;

const IconContainer = styled.div`
  background-color: ${colors.gray200};
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
`;

const Icon = styled(FaRegLightbulb)`
  color: ${colors.slateGray};
`;

const Text = styled.span`
  padding: 1rem;
  color: ${colors.slateGray};
  font-weight: 700;
  font-size: 0.9rem;
`;

const TopArticles = ({ articles }) => (
  <Wrapper>
    <StyledTitle>Top Articles</StyledTitle>
    {articles.map(({ node: { uid, data: { title: { text } } } }, index) => (
      <Card
        key={uid.concat(index)}
        onClick={() => {
          navigate(`/blog/${uid}`);
        }}
      >
        <IconContainer>
          <Icon size={24} />
        </IconContainer>
        <Text>{text}</Text>
      </Card>
    ))}
  </Wrapper>
);

export default TopArticles;
