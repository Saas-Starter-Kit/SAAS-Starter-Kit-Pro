import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 1rem 0rem 1rem;
  background-color: ${(props) => props.theme.backgroundLanding};
  overflow: hidden;
  @media (min-width: ${breakpoints.small}) {
    padding: 5rem 1.5rem 0rem 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding: 6rem 2rem 1rem 2rem;
  }
`;

const TextWrapper = styled.div`
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
`;

const FooterWrapper = styled.div`
  margin-top: 2rem;
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

const Testimonial = () => (
  <Wrapper>
    <TextWrapper>
      <QuoteWrapper>
        <p>
          &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas
          culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.&rdquo;
        </p>
      </QuoteWrapper>
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
    </TextWrapper>
  </Wrapper>
);

export default Testimonial;
