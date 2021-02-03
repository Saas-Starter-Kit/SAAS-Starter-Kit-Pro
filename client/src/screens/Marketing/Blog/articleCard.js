import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { AnimatedCard } from './cards';
import Tag from './tag';

const Card = styled(AnimatedCard)`
  background-color: ${colors.white};
  display: flex;
`;

const ImageWrapper = styled.picture`
  position: relative;
  margin: 0.5rem 0 0.5rem 0.5rem;
  flex-basis: 40%;
  min-height: 200px;
`;

const Image = styled.img`
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  object-position: center center;
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  flex-basis: 60%;
`;

const TagWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  * {
    margin-right: 0.5rem;
  }
`;

const ArticleTitle = styled.div`
  color: ${colors.gray800};
  &:hover {
    color: ${colors.gray800};
  }
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
`;

const Date = styled.div`
  color: ${colors.cadetBlue};
  font-size: 12px;
`;

const ArticleCard = ({ title, date, imageSrc, uid, tags }) => (
  <Card
    onClick={() => {
      navigate(`/blog/${uid}`);
    }}
  >
    <ImageWrapper>
      <Image src={imageSrc} />
    </ImageWrapper>
    <TextWrapper>
      <TagWrapper>
        {tags.map((tag) => (
          <Tag
            key={uid.concat(tag)}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/tag/?tag=${tag}`);
            }}
          >
            {tag}
          </Tag>
        ))}
      </TagWrapper>
      <ArticleTitle>{title}</ArticleTitle>
      <Date>{date}</Date>
    </TextWrapper>
  </Card>
);

export default ArticleCard;
