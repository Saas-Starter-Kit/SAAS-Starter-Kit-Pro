import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useStaticQuery, graphql } from 'gatsby';
import axios from '../../../services/axios';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import * as Yup from 'yup';
import Can from '../../../services/casl';
import LoadingOverlay from '../../../components/Common/loadingOverlay';

const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required')
});

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  padding-top: 0.5rem;
`;

const InputWrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 0.5em;
  margin-top: -0.2rem;
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

    let result = await axios.delete('/api/delete/role', { params }).catch((err) => {
      fetchFailure(err);
    });

    //confirm delete
    console.log(result);
  };

  return (
    <div>
      <div>Users</div>
      {isLoading && <LoadingOverlay />}
      <Formik validationSchema={ValidSchema} initialValues={{ email: '' }} onSubmit={handleSubmit}>
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
              />
            </InputWrapper>
            {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}

            <ButtonWrapper>
              <Button type="submit">Submit </Button>
            </ButtonWrapper>
          </form>
        )}
      </Formik>
      <div>
        <Button onClick={getAppUsers}>Get App Users</Button>
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
      </div>
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
