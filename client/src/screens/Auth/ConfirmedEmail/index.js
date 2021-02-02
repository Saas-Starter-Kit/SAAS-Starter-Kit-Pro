import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import { setAnalyticsUserId, sendEventToAnalytics } from '../../../services/analytics';

import LoadingOverlay from '../../../components/Common/loadingOverlay';

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
  const provider = queryParams[4];
  const usernameRaw = queryParams[3].split('&')[0];
  const name = usernameRaw.split('%20');
  const firstName = name[0];
  const username = `${name[0]} ${name[1]}`;
  const isInviteFlow = queryParams[5].split('&')[0];
  const app_id = queryParams[6];
  const photo = null;

  let user = { email, username, id, photo, provider };

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  console.log(typeof isInviteFlow);

  useEffect(() => {
    createValidUser();
  }, [location]);

  useEffect(() => {
    if (!isInviteFlow == 'undefined') createRole();
  }, [isInviteFlow]);

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

    if (!process.env.NODE_ENV == 'development') {
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

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div>Thank You for confirming your email, your account is setup and ready to use</div>
      {!isInviteFlow == 'undefined' && (
        <div>
          <div>Click below to navigate to the app your were invited to</div>
          <Link to={`/app/${app_id}/dashboard`}>Go to App</Link>
        </div>
      )}
      <div>Click here to navigate to the user dashboard as a free tier user</div>
      <Link to="/user/dashboard">Go to Dashboard</Link>
      <div>Click here to add a subscription your account</div>
      <Link to="/purchase/plan">Upgrade Plan</Link>
    </div>
  );
};

export default ConfirmedEmail;
