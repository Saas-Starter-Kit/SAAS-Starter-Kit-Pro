import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spin, message } from 'antd';
import { Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Can from '../../../services/casl';
import axios from '../../../services/axios';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import getOrgId from '../../../utils/orgId';
import OrgContext from '../../../utils/orgContext';

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

// TODO: replace with actual data
const getData = () => ({
  site: {
    siteMetadata: {
      siteUrl: 'http://localhost:3000'
    }
  }
});

const Users = () => {
  const org_id = getOrgId();
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { role } = useContext(AuthContext);
  const { isLoading } = apiState;
  const data = getData();
  const domainUrl = data.site.siteMetadata.siteUrl;
  const [appUsers, setUsers] = useState();
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const handleSubmit = async (values) => {
    fetchInit();
    let sender_email = authState.user.email;
    let sender_display_name = authState.user.username;
    let recipient_email = values.email;

    let data = { domainUrl, recipient_email, sender_email, sender_display_name, org_id };
    await axios.post('/api/users/invite', data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    fetchSuccess();
    message.success('Invite Sent');
  };

  const getAppUsers = async () => {
    fetchInit();

    let params = { org_id };
    let result = await axios.get('/api/get/app-users', { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    setUsers(result.data);
    fetchSuccess();
  };

  const removeUserRole = async (role_id) => {
    let params = { role_id, role };

    await axios.delete('/api/delete/role', { params, headers }).catch((err) => {
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
                    <RemoveUserButton onClick={() => removeUserRole(row.id)}>
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
