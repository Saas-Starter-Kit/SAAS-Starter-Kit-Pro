import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundLanding};
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem 4rem 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding: 6rem 2rem 6rem 2rem;
    max-width: 1280px;
  }
`;

const LargeHeader = styled.h4`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  line-height: 2rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 1.875rem;
    font-size: 1.875rem;
  }
`;

const LargeParagraph = styled.p`
  margin-top: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const TextWrapper = styled.div`
  margin-left: 1rem;
`;

const SmallHeader = styled.h5`
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const SmallParagraph = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colors.gray500};
`;

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: ${colors.white};
`;

const FeatureImage = styled.img`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureWrapper1 = styled.div`
  margin-top: 3rem;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 6rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 2rem;
    gap: 2rem;
    align-items: center;
  }
`;

const FeatureWrapper2 = styled.div`
  margin-top: 3rem;
  @media (min-width: ${breakpoints.small}) {
    margin-top: 4rem;
  }
  @media (min-width: ${breakpoints.large}) {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 2rem;
    gap: 2rem;
    align-items: center;
    margin-top: 6rem;
  }
`;

const FeatureWrapper2b = styled.div`
  @media (min-width: ${breakpoints.large}) {
    grid-column-start: 2;
  }
`;

const List = styled.ul`
  margin-top: 2.5rem;
`;

const ListItem = styled.li`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.375rem;
  color: ${colors.white};
  background-color: ${colors.indigo500};
`;

const LandingFeatures = () => (
  <Container>
    <FeatureWrapper1>
      <div>
        <LargeHeader>Awesome Feature about App 1</LargeHeader>
        <LargeParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi recusandae,
          porro maiores officia assumenda aliquam laborum ab aliquid veritatis impedit odit adipisci
          optio iste blanditiis facere. Totam, velit.
        </LargeParagraph>
        <List>
          <ListItem>
            <Item>
              <ImageWrapper>
                <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
              </ImageWrapper>
              <TextWrapper>
                <SmallHeader>Sub Feature 1</SmallHeader>
                <SmallParagraph>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                  perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </SmallParagraph>
              </TextWrapper>
            </Item>
          </ListItem>
          <ListItem>
            <Item>
              <ImageWrapper>
                <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
              </ImageWrapper>
              <TextWrapper>
                <SmallHeader>Sub Feature 2</SmallHeader>
                <SmallParagraph>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                  perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </SmallParagraph>
              </TextWrapper>
            </Item>
          </ListItem>
        </List>
      </div>
      <FeatureImage
        width='490'
        src='https://tailwindui.com/img/features/feature-example-1.png'
        alt=''
      />
    </FeatureWrapper1>
    <FeatureWrapper2>
      <FeatureWrapper2b>
        <LargeHeader>Awesome Feature about App 2</LargeHeader>
        <LargeParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus
          eligendi delectus, cum deleniti sunt in labore nihil quod quibusdam expedita nemo.
        </LargeParagraph>
        <List>
          <ListItem>
            <Item>
              <ImageWrapper>
                <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
              </ImageWrapper>
              <TextWrapper>
                <SmallHeader>Sub Feature 1</SmallHeader>
                <SmallParagraph>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                  perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </SmallParagraph>
              </TextWrapper>
            </Item>
          </ListItem>
          <ListItem>
            <Item>
              <ImageWrapper>
                <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
              </ImageWrapper>
              <TextWrapper>
                <SmallHeader>Sub Feature 2</SmallHeader>
                <SmallParagraph>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                  perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </SmallParagraph>
              </TextWrapper>
            </Item>
          </ListItem>
        </List>
      </FeatureWrapper2b>
      <FeatureImage
        width='490'
        src='https://tailwindui.com/img/features/feature-example-2.png'
        alt=''
      />
    </FeatureWrapper2>
  </Container>
);

export default LandingFeatures;
