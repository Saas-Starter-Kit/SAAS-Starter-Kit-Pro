import React, { useState, useEffect, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import AuthContext from '../../../utils/authContext';
import OrgContext from '../../../utils/orgContext';
import { colors, breakpoints } from '../../../styles/theme';

import Card from '../../../components/Purchase/purchaseCard';

const CardWrapper = styled.div`
  margin-top: 3rem;
  width: 38rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  @media (max-width: ${breakpoints.small}) {
    width: 90%;
  }
`;

const StyledHeader = styled.h1`
  padding-bottom: 2rem;
`;

const StyledSection = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: ${colors.indigo600};
`;

const CheckAuth = () => {
  const { authState } = useContext(AuthContext);
  const { orgState } = useContext(OrgContext);
  const { id, subscription_id } = orgState;
  const [nullOrg, setNullOrg] = useState(false);
  const [nullAuth, setNullAuth] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setNullAuth(true);
    } else if (!id) {
      setNullOrg(true);
    } else if (subscription_id) {
      navigate('/subscriptionexists');
    } else {
      navigate('/purchase/plan');
    }
  }, [authState, orgState]);

  return (
    <div>
      <CardWrapper>
        <Card>
          {nullAuth && (
            <React.Fragment>
              <StyledHeader>User Account Not Found</StyledHeader>
              <StyledHeader>Please Sign-in or Sign-up</StyledHeader>
              <StyledSection>
                <div>Already Have an account? login below</div>
                <StyledLink to="/auth/login">Login</StyledLink>
              </StyledSection>
              <StyledSection>
                <div>Need to create an account? click below</div>
                <StyledLink to="/auth/signup">Signup</StyledLink>
              </StyledSection>
            </React.Fragment>
          )}
          {nullOrg && (
            <React.Fragment>
              <StyledHeader>Organization Account Not Found</StyledHeader>
              <StyledHeader>
                Please Add a subscription through the Organization Settings Page
              </StyledHeader>
              <StyledSection>
                <div>Please Select an organization from user dashboard</div>
                <StyledLink to="/user">Go to Dashboard</StyledLink>
              </StyledSection>
            </React.Fragment>
          )}
        </Card>
      </CardWrapper>
    </div>
  );
};

export default CheckAuth;
