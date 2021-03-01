import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  margin-top: 0.1rem;
`;

const QuoteWrapper = styled.div`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 500;
`;

const FooterWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  @media (min-width: ${breakpoints.medium}) {
    flex-shrink: 0;
  }
`;

const Image = styled.img`
  margin-left: auto;
  margin-right: auto;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
`;

const TitleWrapper = styled.div`
  margin-top: 0.75rem;
  text-align: center;
  @media (min-width: ${breakpoints.medium}) {
    margin-top: 0;
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
`;

const SlashSvg = styled.svg`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
  color: ${(props) => props.theme.primary};
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  width: 1.25rem;
`;

const Job = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
`;

const Testimonial = ({ testimonial, name, job }) => (
  <Wrapper>
    <TextWrapper>
      <QuoteWrapper>
        <p>{testimonial}</p>
      </QuoteWrapper>
      <FooterWrapper>
        <ImageWrapper>
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </ImageWrapper>
        <TitleWrapper>
          <Title>{name}</Title>
          <SlashSvg fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 0h3L9 20H6l5-20z" />
          </SlashSvg>
          <Job>{job}</Job>
        </TitleWrapper>
      </FooterWrapper>
    </TextWrapper>
  </Wrapper>
);

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundLanding};
  padding-top: 7rem;
  padding-bottom: -3rem;
`;

const testimonials = [
  { id: 1, title: 'Testimonial 1', name: 'Karel johnsoh', job: 'CEO, Company 1' },
  { id: 2, title: 'Lorem Ipsep 2', name: 'Jenny Smith', job: 'CFO, Example Inc' },
  { id: 3, title: 'Excellent Product', name: 'Racheal Aniston', job: 'CEO, Private LLC' }
];

const Testimonials = () => {
  return (
    <Container>
      <Carousel dotPosition="top" autoplay>
        {testimonials.map((testimonial) => (
          <Testimonial
            key={testimonial.id}
            testimonial={testimonial.title}
            name={testimonial.name}
            job={testimonial.job}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
