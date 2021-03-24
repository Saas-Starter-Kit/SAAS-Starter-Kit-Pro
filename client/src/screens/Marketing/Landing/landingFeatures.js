import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';

import image1 from '../../../assets/images/illustrations/undraw_Build_wireframe_re_ln7g.svg';
import image2 from '../../../assets/images/illustrations/undraw_All_the_data_re_hh4w.svg';
import { FcApproval, FcBarChart, FcCollect, FcConferenceCall } from 'react-icons/fc';

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
  }
`;

const LargeHeader = styled.h4`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  text-align: center;
  @media (min-width: ${breakpoints.small}) {
    font-size: 1.875rem;
    text-align: left;
  }
`;

const LargeParagraph = styled.p`
  margin-top: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-align: center;
  @media (min-width: ${breakpoints.small}) {
    text-align: left;
  }
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

const FeatureImage = styled.img`
  width: 100%;
  height: ${({ aspectRatio }) => `calc(100% * ${aspectRatio})`};
  @media (min-width: ${breakpoints.large}) {
    width: 90%;
    height: ${({ aspectRatio }) => `calc(90% * ${aspectRatio})`};
  }
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
  margin-left: -1rem;
  list-style-type: none;
  @media (min-width: ${breakpoints.small}) {
    margin-left: 0;
  }
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

const StyledApproval = styled(FcApproval)`
  height: 2rem;
  width: 2rem;
`;

const StyledBarChart = styled(FcBarChart)`
  height: 2rem;
  width: 2rem;
`;

const StyledCollect = styled(FcCollect)`
  height: 2rem;
  width: 2rem;
`;

const StyledCall = styled(FcConferenceCall)`
  height: 2rem;
  width: 2rem;
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
                <StyledApproval />
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
                <StyledBarChart />
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
        aspectRatio={532 / 417}
        src={image1}
        alt="Abstract illustration of man wearing a turtleneck standing next to floating graphs and images"
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
                <StyledCollect />
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
                <StyledCall />
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
        src={image2}
        aspectRatio={532 / 372}
        alt="Abstract illustration of man wearing a suit standing next to floating graphs and images"
      />
    </FeatureWrapper2>
  </Container>
);

export default LandingFeatures;
