import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';

import LoadingOverlay from '../../../components/Common/loadingOverlay';
import DeleteAppModal from './DeleteAppModal';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  max-width: 14rem;
`;

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [apps, setApps] = useState();
  const [userApps, setUserApps] = useState();
  const [isModal, setModal] = useState(false);
  const [deleteAppId, setDeleteAppId] = useState();

  useEffect(() => {
    if (authState.user) {
      getApps();
    }
  }, [authState]);

  const getApps = async () => {
    let user_id = authState.user.id;

    let params = {
      user_id
    };

    const result = await axios.get(`/api/get/app`, { params }).catch((err) => {
      fetchFailure(err);
    });

    let adminApps = result.data.filter((item) => item.role == 'admin');
    let userApps = result.data.filter((item) => item.role == 'user');

    console.log(result);
    setApps(adminApps);
    setUserApps(userApps);
  };

  const postApp = async (event) => {
    event.preventDefault();
    fetchInit();

    let name = event.target.name.value;

    let data = {
      name
    };

    const result = await axios.post(`/api/post/app`, data).catch((err) => {
      fetchFailure(err);
    });

    createRole(result);
  };

  const createRole = async (result) => {
    console.log(result);
    let app_id = result.data.app_id;
    let user_id = authState.user.id;
    let role = 'admin';

    let data = {
      app_id,
      user_id,
      role
    };

    const roleResult = await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });

    console.log(roleResult);
    getApps();
    fetchSuccess();
  };

  const deleteApp = async () => {
    setModal(false);
    fetchInit();
    let params = { app_id: deleteAppId };

    await axios.delete('/api/delete/app', { params });

    getApps();
    fetchSuccess();
  };

  const handleModalCancel = () => {
    setModal(false);
  };

  const handleDeleteAppModal = (app_id) => {
    setDeleteAppId(app_id);
    setModal(true);
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <h1>Dashboard</h1>
      <h2>Create App</h2>
      <form onSubmit={postApp}>
        <input type="text" name="name" />
        <button type="submit">Save</button>
      </form>
      <Link to="/user/settings/account">Account</Link>
      <Link to="/user/settings/payment">Payment</Link>
      <Link to="/user/settings/subscription">Subscription</Link>
      <h2>My Apps:</h2>
      <button onClick={getApps}>Get Apps</button>
      <div>
        {apps &&
          apps.map((app) => (
            <Card key={app.app_id}>
              <Link to={`/app/${app.app_id}/dashboard`} state={{ app }}>
                {app.app_name}
              </Link>
              <button onClick={() => handleDeleteAppModal(app.app_id)}>Delete App</button>
            </Card>
          ))}
      </div>
      <div>
        <h2>User Apps:</h2>
        {userApps &&
          userApps.map((app) => (
            <Card key={app.app_id}>
              <Link to={`/app/${app.app_id}/dashboard`} state={{ app }}>
                {app.app_name}
              </Link>
            </Card>
          ))}
      </div>
      <DeleteAppModal
        handleModalCancel={handleModalCancel}
        isModal={isModal}
        deleteApp={deleteApp}
      />
    </div>
  );
};

export default Dashboard;
