import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import styled from 'styled-components';

import SEO from '../../../components/Marketing/Layout/seo';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import { setAnalyticsUserId, sendEventToAnalytics } from '../../../services/analytics';
import { colors, breakpoints } from '../../../styles/theme';

import Title from '../../../components/Auth/title';
import AuthCard from '../../../components/Auth/authCard';
import LoadingOverlay from '../../../components/Common/loadingOverlay';

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

const TextWrapper = styled.div`
  text-align: center;
  font-size: 1.075rem;
`;

const CardText = styled.div`
  font-size: 1.075rem;
  font-weight: 500;
  padding-top: 1.5rem;
`;

const ConfirmedEmail = () => {
  const location = useLocation();
  const { LogIn } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  //extract query params
  const queryParams = location.search.split('=');
  console.log(queryParams);
  const email = queryParams[1].split('&')[0];
  const id = queryParams[2].split('&')[0];
  const provider = queryParams[4].split('&')[0];
  const usernameRaw = queryParams[3].split('&')[0];
  const name = usernameRaw.split('%20');
  const firstName = name[0];
  const username = `${name[0]} ${name[1]}`;
  const isInviteFlow = queryParams[5].split('&')[0];
  const app_id = queryParams[6];
  const photo = null;

  let user = { email, username, id, photo, provider };

  /* eslint-disable */
  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  useEffect(() => {
    createValidUser();
  }, [location]);

  useEffect(() => {
    if (isInviteFlow === 'true') createRole();
  }, [isInviteFlow]);
  /* eslint-enable */

  const createValidUser = async () => {
    fetchInit();

    //after verified email, the user info is saved to stripe
    let userId = id;
    let stripeApiData = { userId, email };
    let stripeServerRes = await axios
      .post('/stripe/create-customer', stripeApiData)
      .catch((err) => {
        fetchFailure(err);
      });

    console.log(stripeServerRes);
    //save verified email to sendinblue
    let sibData = { email, firstName };
    await axios.post('/api/post/contact', sibData).catch((err) => {
      fetchFailure(err);
    });

    let stripeCustomerKey = { stripeCustomerKey: stripeServerRes.data.stripe.stripe_customer_id };
    let jwt_token = { token: stripeServerRes.data.token };

    user = { ...user, ...stripeCustomerKey, ...jwt_token };

    if (!process.env.NODE_ENV === 'development') {
      //save event and user id to Google Analytics
      let parameters = {
        method: 'Email'
      };

      sendEventToAnalytics('signup', parameters);
      setAnalyticsUserId(id);
    }
    console.log(user);

    //Login to context
    await LogIn(user);

    fetchSuccess();
  };

  //if the signup process is part of the invite flow
  //then create role
  const createRole = async () => {
    fetchInit();
    let user_id = id;
    let role = 'user';

    let data = {
      app_id,
      user_id,
      role
    };

    const result = await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });
    console.log(result);
    fetchSuccess();
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Email Confirmed Page',
    description: 'Saas Starter Kit Pro Email Confirmed Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {isLoading && <LoadingOverlay />}
        <Title>Thank You for confirming your email, your account is setup and ready to use</Title>
        <AuthCard>
          {isInviteFlow === 'true' && (
            <>
              <CardText>Click below to navigate to the app your were invited to</CardText>
              <TextWrapper>
                <Link to={`/app/${app_id}/dashboard`}>Go to App</Link>
              </TextWrapper>
            </>
          )}
          <CardText>Click here to navigate to the user dashboard as a free tier user</CardText>
          <TextWrapper>
            <Link to="/user/dashboard">Go to Dashboard</Link>
          </TextWrapper>
          <CardText>Click here to add a subscription your account</CardText>
          <TextWrapper>
            <Link to="/purchase/plan">Upgrade Plan</Link>
          </TextWrapper>
        </AuthCard>
      </Wrapper>
    </React.Fragment>
  );
};

export default ConfirmedEmail;
