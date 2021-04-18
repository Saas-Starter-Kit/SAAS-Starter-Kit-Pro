import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { ValidSchema, SignupAuth } from '../helpers';

import SEO from '../../../components/Marketing/Layout/seo';
import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import AuthCard from '../../../components/Auth/authCard';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import SignUpFormHeader from './signupFormHeader';

// TODO: replace with actual data
const getData = () => ({
  site: {
    siteMetadata: {
      siteUrl: 'http://localhost:3000'
    }
  }
});

const Signup = () => {
  const location = useRouter();
  const data = getData();
  const domainUrl = data.site.siteMetadata.siteUrl;
  const { firebase } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [invite_key, setInviteKey] = useState();
  const [isInviteFlow, setInviteFlow] = useState();

  /* eslint-disable */
  //extract data from query params
  useEffect(() => {
    if (!location.isReady) return;
    setInviteFlow(location.query.isInviteFlow);
    setInviteKey(location.query.verify_key);
  }, [location.isReady]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);
  /* eslint-disable */

  const handleSubmit = async (values) => {
    fetchInit();

    let email = values.email;
    let password = values.password;
    let username = values.username;

    let authRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(
      authRes,
      firebase,
      fetchFailure,
      username,
      domainUrl,
      isInviteFlow,
      invite_key,
      location
    );
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    //wait for firebase to confirm signup
    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(
      authRes,
      firebase,
      fetchFailure,
      null,
      domainUrl,
      isInviteFlow,
      invite_key,
      location
    );
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Sign up Page',
    description: 'Saas Starter Kit Pro Sign up Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        {isLoading && <LoadingOverlay />}
        <SignUpFormHeader />

        <AuthCard>
          <Formik
            validationSchema={ValidSchema}
            initialValues={{ email: '', password: '', username: '' }}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    data-test-id="email"
                  />
                </InputWrapper>
                {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                <Label htmlFor="username">First and Last Name:</Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    data-test-id="username"
                  />
                </InputWrapper>
                {errors.username && touched.username && <ErrorText>{errors.username}</ErrorText>}
                <Label htmlFor="password">Password:</Label>
                <InputWrapper>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    data-test-id="password"
                  />
                </InputWrapper>
                {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                <Button type="submit">SignUp</Button>
              </form>
            )}
          </Formik>

          <ContinueWith />
          <GoogleButton GoogleSignin={GoogleSignin} />
        </AuthCard>
      </div>
    </React.Fragment>
  );
};

export default Signup;
