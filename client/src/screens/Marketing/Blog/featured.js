import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { colors, breakpoints } from '../../../styles/theme';
import AnimatedCard from './AnimatedCard';

const Wrapper = styled.div`
  padding: 2rem 2rem 4rem;
`;

const Title = styled.h2`
  color: ${colors.gray800};
  margin-bottom: 3.5rem;
  line-height: 1.5715;
  font-weight: 700;
`;

const Card = styled(AnimatedCard)`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.large}) {
    flex-direction: row;
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
    <Title>Featured Article</Title>
    <Card
      onClick={() => {
        navigate(`/blog/${uid}`);
      }}
    >
      <ImageWrapper>
        <Image src={data.hero_image.thumbnails.desktop.url} />
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
