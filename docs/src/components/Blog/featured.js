import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { colors, breakpoints } from '../../styles/theme';
import { AnimatedCard } from './cards';
import Title from './sectionTitle';

const Wrapper = styled.div`
  padding: 2rem 0 4rem;
  max-width: ${breakpoints.large};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: ${breakpoints.medium}) {
    padding: 2rem 2rem 4rem;
  }
`;

const StyledTitle = styled(Title)`
  color: ${colors.gray800};
  margin-left: 1rem;
`;

const Card = styled(AnimatedCard)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.picture`
  position: relative;
  margin: 0.5rem 0 0.5rem 0.5rem;
  flex-basis: 40%;
  @media (max-width: ${breakpoints.small}) {
    display: none;
  }
`;

const Image = styled.img`
  object-fit: cover;
  object-position: center center;
  border-radius: 0.5rem;
  top: 0px;
  left: 0px;
  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
  }
  @media (min-width: ${breakpoints.medium}) {
    height: 100%;
    position: absolute;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex-basis: 60%;
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

const Paragraph = styled.div`
  color: ${colors.slateGray};
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.4rem;
`;

const Featured = ({
  article: {
    node: { data, uid }
  }
}) => (
  <Wrapper>
    <StyledTitle>Featured Article</StyledTitle>
    <Card
      onClick={() => {
        navigate(`/blog/${uid}`);
      }}
    >
      <ImageWrapper>
        <Image
          src={data.hero_image.thumbnails.desktop.url}
          alt={data.hero_image.thumbnails.desktop.alt || 'Featured blog post hero image'}
        />
      </ImageWrapper>
      <TextWrapper>
        <ArticleTitle>{data.title.text}</ArticleTitle>
        <Paragraph>
          Danish fontina pepper jack goat. Cheese and biscuits when the cheese comes out everybody's
          happy cottage cheese stinking bishop emmental queso halloumi queso. Manchego cheese and
          wine roquefort bocconcini camembert de normandie goat brie dolcelatte. Cheesecake red
          leicester roquefort paneer when the cheese comes out everybody's happy fromage frais
          cheese triangles cow. Cheese and biscuits macaroni cheese cheese on toast everyone loves.
          Swiss boursin danish fontina. Macaroni cheese boursin paneer gouda dolcelatte st. agur
          blue cheese cheese strings say cheese. Cut the cheese rubber cheese croque monsieur
          ricotta croque monsieur manchego cauliflower cheese brie. Port-salut stilton monterey jack
          stinking bishop port-salut fondue cheese slices cream cheese. Cheese and wine say cheese.
        </Paragraph>
      </TextWrapper>
    </Card>
  </Wrapper>
);

export default Featured;
