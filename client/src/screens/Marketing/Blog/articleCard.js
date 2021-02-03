import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Card = styled.article`
  background-color: ${colors.white};
  border-radius: 1rem;
  display: flex;
  margin: 0.5rem;
  box-shadow: 1px 1px 5px 0 rgb(1 1 1 / 5%);
  cursor: pointer;
  transition: transform 250ms ease, box-shadow 250ms ease, color 250ms ease;
  transition-property: transform, box-shadow, color;
  transition-duration: 250ms, 250ms, 250ms;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s;
  -webkit-transition: -webkit-transform 250ms ease, box-shadow 250ms ease, color 250ms ease;
  -webkit-transition: transform 250ms ease, box-shadow 250ms ease, color 250ms ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0px 2px 4px rgb(46 41 51 / 8%), 0px 5px 10px rgb(71 63 79 / 16%);
  }
`;

const ImageWrapper = styled.picture`
  position: relative;
  margin: 0.5rem 0 0.5rem 0.5rem;
  flex-basis: 40%;
  min-height: 10rem;
  max-height: 290px;
  height: 100%;
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

const Tag = styled.div`
  font-size: 10px;
  white-space: nowrap;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  vertical-align: middle;
  padding: 0.225rem 0.9rem;
  line-height: 1.3rem;
  background-color: ${colors.gray200};
  color: ${colors.slateGray};
  &:hover {
    color: ${colors.gray200};
    background-color: ${colors.slateGray};
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
