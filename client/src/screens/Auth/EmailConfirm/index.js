import React from 'react';
import styled from 'styled-components';
import SEO from '../../../components/Marketing/Layout/seo';
import Title from '../../../components/Auth/title';
import { colors, breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const TitleWrapper = styled.div`
  max-width: 36rem;
  text-align: center;
`;

const EmailConfirm = () => {
  const seoData = {
    title: 'Saas Starter Kit Pro Confirm Email Page',
    description: 'Saas Starter Kit Pro Confirm Email Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <TitleWrapper>
          <Title>We have Sent you an email confirmation please check your inbox to continue</Title>
        </TitleWrapper>
      </Wrapper>
    </React.Fragment>
  );
};

export default EmailConfirm;
