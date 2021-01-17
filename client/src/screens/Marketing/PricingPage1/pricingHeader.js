import React from "react"
import styled from "styled-components"
import { colors, breakpoints } from "../../../styles/theme"

const Wrapper = styled.div`
  text-align: center;
  padding-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 5rem;
  }
`

const Overline = styled.h2`
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.gray300};
  letter-spacing: 0.05em;
`

const Title = styled.p`
  color: ${colors.white};
  font-weight: 800;
  font-size: 1.875rem;
  line-height: 2.25rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    font-size: 3rem;
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }
`

const Description = styled.p`
  color: ${colors.gray300};
  font-size: 1.25rem;
  margin-top: 0.75rem;
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.75rem;
  @media (min-width: ${breakpoints.small}) {
    margin-top: 1.25rem;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

const PricingHeader = () => (
  <Wrapper>
    <Overline>Pricing</Overline>
    <Title>The right price for you, whoever you are</Title>
    <Description>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
      eligendi quos odit doloribus molestiae voluptatum.
    </Description>
  </Wrapper>
)

export default PricingHeader
