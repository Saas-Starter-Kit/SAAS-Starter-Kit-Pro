import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';

import SEO from '../../../components/Marketing/Layout/seo';
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
  const location = useRouter();
  const splitPath = location.pathname.split('/');
  const invite_key = splitPath[3];
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [org_id, setOrgId] = useState();

  /* eslint-disable */
  useEffect(() => {
    if (authState.user.id) verifyInvite();
  }, [authState]);
  /* eslint-enable */

  const verifyInvite = async () => {
    //verify invite key, returing org id.
    let user_id = authState.user.id;

    let data = { invite_key };
    let result = await axios
      .post('/api/users/verify-invite', data)
      .catch((err) => fetchFailure(err));

    let org_id = result.data.org_id;
    setOrgId(org_id);
    createRole(org_id, user_id);
  };

  const createRole = async (org_id, user_id) => {
    fetchInit();
    let role = 'user';

    let data = {
      org_id,
      user_id,
      role
    };

    await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });
    fetchSuccess();
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Confirmed Invite page',
    description: 'Saas Starter Kit Pro Confirmed Invite page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {isLoading && <LoadingOverlay />}
        <StyledCard>
          <Title>
            Your invite to the app has been confirmed, click below to navigate to the app
          </Title>
          <Link href={`/app/${org_id}/dashboard`}>
            <a>
              <ConfirmButton>Go to App</ConfirmButton>
            </a>
          </Link>
        </StyledCard>
      </Wrapper>
    </React.Fragment>
  );
};

export default ConfirmedInvite;
