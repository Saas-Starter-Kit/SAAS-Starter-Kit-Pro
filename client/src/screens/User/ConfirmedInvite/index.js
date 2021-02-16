import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import styled from 'styled-components';
import { breakpoints, colors } from '../../../styles/theme';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';

import ConfirmButton from '../../../components/Purchase/purchaseButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import Card from '../../../components/Common/Card';

const Wrapper = styled.div`
  text-align: center;
  padding-top: 3rem;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 38rem;
  }
`;

const StyledCard = styled(Card)`
  margin: 0;
  max-width: 38rem;
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const ConfirmedInvite = () => {
  const location = useLocation();
  const splitPath = location.pathname.split('/');
  const app_id = splitPath[3];
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  useEffect(() => {
    if (authState.user) createRole();
  }, [authState]);

  const createRole = async () => {
    fetchInit();
    let user_id = authState.user.id;
    let role = 'user';

    let data = {
      app_id,
      user_id,
      role
    };

    await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });
    fetchSuccess();
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      <StyledCard>
        <Title>Your invite to the app has been confirmed, click below to navigate to the app</Title>
        <Link to={`/app/${app_id}/dashboard`}>
          <ConfirmButton>Go to App</ConfirmButton>
        </Link>
      </StyledCard>
    </Wrapper>
  );
};

export default ConfirmedInvite;
