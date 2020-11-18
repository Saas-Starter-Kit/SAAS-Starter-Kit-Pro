import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import DesktopBackground1 from '../../../components/svgs/desktopBackground1';
import MobileBackground1 from '../../../components/svgs/mobileBackground1';
import DesktopBackground2 from '../../../components/svgs/desktopBackground2';
import MobileBackground2 from '../../../components/svgs/mobileBackground2';

const Container1 = styled.div`
  background-color: ${colors.gray50};
  padding-top: 4rem;
  padding-bottom: 4rem;
  overflow: hidden;
  @media (min-width: ${breakpoints.large}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;

const Container2 = styled.div`
  position: relative;
  max-width: 36rem;
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
    max-width: 1280px;
  }
`;

const LargeHeader = styled.h4`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  color: ${colors.gray900};
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
  color: ${colors.gray500};
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

const List = styled.ul`
  margin-top: 2.5rem;
`;

const ListItem = styled.li`
  margin-top: 2.5rem;
`;

const Item = styled.div`
  display: flex;
`;

const ImageWrapper1 = styled.div`
  flex-shrink: 0;
`;

const ImageWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.375rem;
  color: ${colors.white};
  background-color: ${colors.indigo500};
`;

const MenuImg = styled.img`
  height: 2rem;
  width: 2rem;
  color: ${colors.white};
`;

const FeatureImage = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureWrapper1a = styled.div`
  position: relative;
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

const FeatureWrapper1b = styled.div`
  position: relative;
`;

const FeatureWrapper2a = styled.div`
  position: relative;
  margin-top: 3rem;
  @media (min-width: ${breakpoints.small}) {
    margin-top: 4rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-top: 6rem;
  }
`;

const FeatureWrapper2b = styled.div`
  @media (min-width: ${breakpoints.large}) {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 2rem;
    gap: 2rem;
    align-items: center;
  }
`;

const FeatureWrapper2c = styled.div`
  @media (min-width: ${breakpoints.large}) {
    grid-column-start: 2;
  }
`;

const MobileBackgroundWrapper1 = styled.div`
  margin-top: 2.5rem;
  margin-left: -1rem;
  margin-right: -1rem;
  position: relative;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 0;
  }
`;

const MobileBackgroundWrapper2 = styled.div`
  margin-top: 2.5rem;
  margin-left: -1rem;
  margin-right: -1rem;
  position: relative;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 0;
    grid-column-start: 1;
  }
`;

const LandingFeatures = () => (
  <Container1>
    <Container2>
      <DesktopBackground1 />
      <FeatureWrapper1a>
        <FeatureWrapper1b>
          <LargeHeader>Awesome Feature about App 1</LargeHeader>
          <LargeParagraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur minima sequi
            recusandae, porro maiores officia assumenda aliquam laborum ab aliquid veritatis impedit
            odit adipisci optio iste blanditiis facere. Totam, velit.
          </LargeParagraph>
          <List>
            <li>
              <Item>
                <ImageWrapper1>
                  <ImageWrapper2>
                    <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                  </ImageWrapper2>
                </ImageWrapper1>
                <TextWrapper>
                  <SmallHeader>Sub Feature 1</SmallHeader>
                  <SmallParagraph>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                    perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </SmallParagraph>
                </TextWrapper>
              </Item>
            </li>
            <ListItem>
              <Item>
                <ImageWrapper1>
                  <ImageWrapper2>
                    <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                  </ImageWrapper2>
                </ImageWrapper1>
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
        </FeatureWrapper1b>
        <MobileBackgroundWrapper1>
          <MobileBackground1 />
          <FeatureImage
            width='490'
            src='https://tailwindui.com/img/features/feature-example-1.png'
            alt=''
          />
        </MobileBackgroundWrapper1>
      </FeatureWrapper1a>
      <DesktopBackground2 />
      <FeatureWrapper2a>
        <FeatureWrapper2b>
          <FeatureWrapper2c>
            <LargeHeader>Awesome Feature about App 2</LargeHeader>
            <LargeParagraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex obcaecati natus
              eligendi delectus, cum deleniti sunt in labore nihil quod quibusdam expedita nemo.
            </LargeParagraph>
            <List>
              <li>
                <Item>
                  <ImageWrapper1>
                    <ImageWrapper2>
                      <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                    </ImageWrapper2>
                  </ImageWrapper1>
                  <TextWrapper>
                    <SmallHeader>Sub Feature 1</SmallHeader>
                    <SmallParagraph>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                      perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                    </SmallParagraph>
                  </TextWrapper>
                </Item>
              </li>
              <ListItem>
                <Item>
                  <ImageWrapper1>
                    <ImageWrapper2>
                      <MenuImg src='/icons/chart-bar.svg' alt='chart bar' />
                    </ImageWrapper2>
                  </ImageWrapper1>
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
          </FeatureWrapper2c>
          <MobileBackgroundWrapper2>
            <MobileBackground2 />
            <FeatureImage
              width='490'
              src='https://tailwindui.com/img/features/feature-example-2.png'
              alt=''
            />
          </MobileBackgroundWrapper2>
        </FeatureWrapper2b>
      </FeatureWrapper2a>
    </Container2>
  </Container1>
);

export default LandingFeatures;
