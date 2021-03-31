import React, { useState, useContext, useEffect } from 'react';

import { navigate } from 'gatsby';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import SEO from '../../../../components/Marketing/Layout/seo';
import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import styled from 'styled-components';

import SettingsHeader from '../../../../components/User/Navigation/settingsHeader';
import UpdateUsernameCard from './updateUsernameCard';
import UpdateEmailCard from './updateEmailCard';

const Title = styled.h1`
  font-size: 1.5rem;
`;

const AccountSettings = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  //user state
  const [id, setId] = useState();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isEmail, setIsEmail] = useState();

  /* eslint-disable */
  useEffect(() => {
    if (authState.user) {
      setUser();
    }
  }, [authState]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);
  /* eslint-enable */

  /*
      Auth Methods
  */

  const setUser = async () => {
    let userEmail = authState.user.email;
    let displayName = authState.user.username;
    let id = authState.user.id;
    let isEmail = authState.user.provider === 'password';

    setId(id);
    setEmail(userEmail);
    setIsEmail(isEmail);
    setUsername(displayName);
  };

  const updateUsername = async (event) => {
    event.preventDefault();
    fetchInit();
    let curEmail = authState.user.email;

    const data = { id, username, curEmail };

    await axios.put(`/auth/put/username`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    navigate('/auth/login');
  };

  const updateEmail = async (event) => {
    event.preventDefault();
    fetchInit();
    let oldEmail = authState.user.email;

    const data = { id, email, oldEmail };
    await axios.put(`/auth/put/email`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    navigate('/auth/login');
  };

  /* 
      Helper Methods
  */

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Account page',
    description: 'Saas Starter Kit Pro Account page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <SettingsHeader />
        <Title>Account Settings</Title>
        {isLoading && <LoadingOverlay />}
        <UpdateUsernameCard
          isEmail={isEmail}
          handleUsernameChange={handleUsernameChange}
          username={username}
          updateUsername={updateUsername}
        />
        <UpdateEmailCard
          handleEmailChange={handleEmailChange}
          isEmail={isEmail}
          email={email}
          updateEmail={updateEmail}
        />
      </div>
    </React.Fragment>
  );
};

export default AccountSettings;
