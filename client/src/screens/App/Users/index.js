import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useStaticQuery, graphql } from 'gatsby';
import * as Yup from 'yup';
import { Spin, message } from 'antd';

import axios from '../../../services/axios';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import Can from '../../../services/casl';

import Button from '../../../components/Common/buttons/AltButton1';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInput from '../../../components/Common/forms/TextInput';
import ErrorText from '../../../components/Common/errorText';

const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required')
});

const InputWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: left;
`;

const Users = ({ app_id }) => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const data = useStaticQuery(staticQuery);
  const domainUrl = data.site.siteMetadata.siteUrl;
  const [appUsers, setUsers] = useState();

  const handleSubmit = async (values) => {
    fetchInit();
    let inviterEmail = authState.user.email;
    let inviterDisplayName = authState.user.username;
    let inviteRecipient = values.email;

    let data = { domainUrl, inviteRecipient, inviterEmail, inviterDisplayName, app_id };
    await axios.post('/api/users/invite', data).catch((err) => {
      fetchFailure(err);
    });

    fetchSuccess();
  };

  const getAppUsers = async () => {
    fetchInit();

    let params = { app_id };
    let result = await axios.get('/api/get/app-users', { params }).catch((err) => {
      fetchFailure(err);
    });

    setUsers(result.data);
    fetchSuccess();
  };

  const removeUserRole = async (role_id) => {
    let params = { role_id };

    await axios.delete('/api/delete/role', { params }).catch((err) => {
      fetchFailure(err);
    });

    getAppUsers();
    message.success('User Removed');
  };

  return (
    <div>
      <h1>Users</h1>
      <Card>
        <Spin tip="Loading..." spinning={isLoading}>
          <h2>Invite User</h2>
          <Formik
            validationSchema={ValidSchema}
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FieldLabel htmlFor="email">Email:</FieldLabel>
                <InputWrapper>
                  <TextInput
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputWrapper>
                {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}

                <ButtonWrapper>
                  <Button type="submit">Submit </Button>
                </ButtonWrapper>
              </form>
            )}
          </Formik>
        </Spin>
      </Card>
      <Card>
        <Spin tip="Loading..." spinning={isLoading}>
          <h2>Get App Users</h2>
          <Button onClick={getAppUsers}>Submit</Button>
          <div>
            {appUsers &&
              appUsers.map((user) => (
                <div>
                  <div>Email: {user.email}</div>
                  <div>Role: {user.role}</div>
                  {console.log(user)}
                  <div>Username: {user.username}</div>
                  <Can I="delete" a="role">
                    {user.role == 'user' && (
                      <button onClick={() => removeUserRole(user.role_id)}>Remove</button>
                    )}
                  </Can>
                </div>
              ))}
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default Users;

const staticQuery = graphql`
  query GetDomainUsers {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
