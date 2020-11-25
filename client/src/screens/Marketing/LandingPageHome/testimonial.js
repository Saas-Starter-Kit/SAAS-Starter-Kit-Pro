import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import Background from '../../../components/svgs/testimonialBackground';

const Wrapper = styled.div`
  position: relative;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Section = styled.section`
  padding-top: 3rem;
  background-color: ${colors.gray50};
  overflow: hidden;
  @media (min-width: ${breakpoints.medium}) {
    padding-top: 5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-top: 6rem;
  }
`;

const TextWrapper = styled.div`
  position: relative;
`;

const BlockQuote = styled.blockquote`
  margin-top: 2rem;
`;

const QuoteWrapper = styled.div`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const Footer = styled.footer`
  margin-top: 2rem;
`;

const FooterWrapper = styled.div`
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
  color: ${colors.gray900};
`;

const SlashSvg = styled.svg`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
  color: ${colors.indigo600};
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  width: 1.25rem;
`;

const Job = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray500};
`;

const Testimonial = () => (
  <Section>
    <Wrapper>
      <Background />
      <TextWrapper>
        <BlockQuote>
          <QuoteWrapper>
            <p>
              &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas
              culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et
              corporis.&rdquo;
            </p>
          </QuoteWrapper>
          <Footer>
            <FooterWrapper>
              <ImageWrapper>
                <Image
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
              </ImageWrapper>
              <TitleWrapper>
                <Title>Judith Black</Title>
                <SlashSvg fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M11 0h3L9 20H6l5-20z' />
                </SlashSvg>
                <Job>CEO, Workcation</Job>
              </TitleWrapper>
            </FooterWrapper>
          </Footer>
        </BlockQuote>
      </TextWrapper>
    </Wrapper>
  </Section>
);

export default Testimonial;
