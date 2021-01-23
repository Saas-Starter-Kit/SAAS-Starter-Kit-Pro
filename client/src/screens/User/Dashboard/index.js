import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import { Link } from 'gatsby';

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
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result);
    setApps(result.data);
  };

  const postApp = async (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    let name = event.target.name.value;

    let data = {
      name
    };

    const result = await axios.post(`/api/post/app`, data).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });
    console.log(result);

    createRole(result);
  };

  const createRole = async (result) => {
    let app_id = result.data[0].app_id;
    let user_id = authState.user.id;
    let role = 'admin';

    let data = {
      app_id,
      user_id,
      role
    };

    const roleResult = await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
      console.log(err);
    });

    console.log(roleResult);
  };

  return (
    <div>
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
      {apps &&
        apps.map((app) => (
          <Card key={app.app_id}>
            <Link to={`/app/${app.app_id}/dashboard`} state={{ app }}>
              {app.app_name}
            </Link>
            <button>Delete App</button>
            <button>Invite</button>
          </Card>
        ))}
    </div>
  );
};

export default Dashboard;
