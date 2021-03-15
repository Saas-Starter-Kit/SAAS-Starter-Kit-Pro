import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useStaticQuery, graphql } from 'gatsby';
import * as Yup from 'yup';
import { Spin, message } from 'antd';
import { Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Can from '../../../services/casl';
import axios from '../../../services/axios';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInput from '../../../components/Common/forms/TextInput';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import ErrorText from '../../../components/Common/errorText';

const { Column } = Table;

const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required')
});

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: left;
`;

const RemoveUserButton = styled.button`
  cursor: pointer;
  background-color: red;
  color: white;
  font-weight: 500;
  padding: 0.2rem;
  border-radius: 0.5rem;
  border: none;
`;

const dummyData = [
  { email: 'email1@example.com', username: 'username1', role: 'admin' },
  { email: 'email2@example.com', username: 'username2', role: 'user' },
  { email: 'email3@example.com', username: 'username3', role: 'user' }
];

const Users = ({ org_id }) => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const data = useStaticQuery(staticQuery);
  const domainUrl = data.site.siteMetadata.siteUrl;
  const [appUsers, setUsers] = useState(dummyData);

  const handleSubmit = async (values) => {
    fetchInit();
    let sender_email = authState.user.email;
    let sender_display_name = authState.user.username;
    let recipient_email = values.email;

    let data = { domainUrl, recipient_email, sender_email, sender_display_name, org_id };
    await axios.post('/api/users/invite', data).catch((err) => {
      fetchFailure(err);
    });

    fetchSuccess();
  };

  const getAppUsers = async () => {
    fetchInit();

    let params = { org_id };
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

          <Table dataSource={appUsers}>
            <Column title="" key="avatar" render={() => <UserOutlined />} />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Username" dataIndex="username" key="username" />
            <Column title="Role" dataIndex="role" key="role" />
            <Column
              title="Actions"
              key="action"
              render={(row) => (
                <Can I="remove" a="user">
                  {row.role === 'user' && (
                    <RemoveUserButton onClick={() => removeUserRole(row.role_id)}>
                      Remove
                    </RemoveUserButton>
                  )}
                </Can>
              )}
            />
          </Table>
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
