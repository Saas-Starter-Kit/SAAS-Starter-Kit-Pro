import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import Background from './svgs/testimonialBackground';

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

const TextWrapper = styled.div`
  position: relative;
`;

const LogoSvg = styled.svg`
  margin-left: auto;
  margin-right: auto;
  height: 2.5rem;
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
        {/* Logo */}
        <LogoSvg fill='none' viewBox='0 0 180 40'>
          <path
            fill='#2D3748'
            d='M59.267 32.642h3.718L66.087 21.7l3.126 10.94h3.718l4.642-16.576h-3.434l-3.173 12.29-3.481-12.29H64.69l-3.457 12.29-3.174-12.29h-3.433l4.641 16.576zM83.551 32.973c3.481 0 6.276-2.723 6.276-6.252 0-3.528-2.794-6.252-6.276-6.252-3.48 0-6.252 2.724-6.252 6.252 0 3.529 2.771 6.252 6.252 6.252zm0-2.984c-1.8 0-3.197-1.35-3.197-3.268 0-1.918 1.398-3.268 3.197-3.268 1.824 0 3.221 1.35 3.221 3.268 0 1.918-1.397 3.268-3.22 3.268zM95.031 22.837v-2.036h-3.055v11.84h3.055v-5.66c0-2.486 2.013-3.196 3.6-3.007v-3.41c-1.492 0-2.984.663-3.6 2.273zM111.334 32.642l-4.902-5.992 4.76-5.85h-3.647l-4.073 5.21v-9.946h-3.055v16.578h3.055v-5.376l4.31 5.376h3.552z'
          />
          <path
            fill='#5850EC'
            fill-rule='evenodd'
            d='M42.342 17.45l-7.596-4.385v20.371h8.88v1.974H.21v-1.974h3.947v-12.55l-3.678.92L0 19.89l20.81-5.202h3.08a9.421 9.421 0 00-.67 2.525l-.477 3.922 5.096-2.942v15.243h4.933v-20.37l-7.594 4.385a7.402 7.402 0 012.531-4.736h-4.064a7.39 7.39 0 016.557-2.933l-5.517-3.186a7.388 7.388 0 016.607.397 7.366 7.366 0 012.468 2.316 7.363 7.363 0 012.467-2.316 7.39 7.39 0 016.608-.397l-5.518 3.186a7.389 7.389 0 016.558 2.933h-4.066a7.399 7.399 0 012.533 4.735zm-18.45 6.119h-5.92v9.867h5.92v-9.867zm-10.854 1.973a1.974 1.974 0 11-3.947 0 1.974 1.974 0 013.947 0z'
            clip-rule='evenodd'
          />
          <path
            fill='#5850EC'
            d='M118.495 32.973c2.321 0 4.334-1.232 5.352-3.079l-2.652-1.515c-.474.97-1.492 1.563-2.723 1.563-1.824 0-3.174-1.35-3.174-3.221 0-1.895 1.35-3.244 3.174-3.244 1.207 0 2.226.615 2.699 1.586l2.629-1.54c-.971-1.823-2.984-3.054-5.305-3.054-3.599 0-6.252 2.723-6.252 6.252 0 3.528 2.653 6.252 6.252 6.252zM134.277 20.8v1.398c-.853-1.066-2.131-1.729-3.86-1.729-3.15 0-5.755 2.723-5.755 6.252 0 3.528 2.605 6.252 5.755 6.252 1.729 0 3.007-.663 3.86-1.729v1.397h3.055v-11.84h-3.055zm-3.292 9.26c-1.871 0-3.268-1.35-3.268-3.34 0-1.988 1.397-3.338 3.268-3.338 1.895 0 3.292 1.35 3.292 3.339 0 1.99-1.397 3.339-3.292 3.339zM146.875 23.737v-2.936h-2.676v-3.316l-3.055.924V20.8h-2.06v2.936h2.06v4.926c0 3.197 1.445 4.452 5.731 3.978v-2.77c-1.752.094-2.676.07-2.676-1.208v-4.926h2.676zM150.544 19.38c1.042 0 1.895-.853 1.895-1.871s-.853-1.895-1.895-1.895c-1.018 0-1.87.877-1.87 1.895a1.89 1.89 0 001.87 1.87zm-1.515 13.261h3.055v-11.84h-3.055v11.84zM160.516 32.973c3.481 0 6.276-2.724 6.276-6.252 0-3.529-2.795-6.252-6.276-6.252s-6.252 2.723-6.252 6.252c0 3.528 2.771 6.252 6.252 6.252zm0-2.984c-1.8 0-3.197-1.35-3.197-3.268 0-1.918 1.397-3.268 3.197-3.268 1.824 0 3.221 1.35 3.221 3.268 0 1.918-1.397 3.268-3.221 3.268zM175.524 20.469c-1.586 0-2.818.592-3.528 1.658V20.8h-3.055v11.84h3.055v-6.394c0-2.06 1.113-2.936 2.605-2.936 1.373 0 2.344.829 2.344 2.439v6.891H180v-7.27c0-3.15-1.966-4.902-4.476-4.902z'
          />
        </LogoSvg>
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
