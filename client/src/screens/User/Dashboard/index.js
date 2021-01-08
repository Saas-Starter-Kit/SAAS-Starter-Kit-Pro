import React, { useState } from 'react';
import axios from '../../../services/axios';

const Dashboard = () => {
  const [apps, setApps] = useState([]);

  const getApps = async () => {
    let user_id = 56;
    let app_id = 8;

    let data = {
      user_id,
      app_id
    };

    const result = await axios.get(`/api/get/app`, data).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result);
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

    //returning ID
    //createRole
    let app_id = result.data[0].app_id;
    let user_id = 56;
    let is_admin = true;
    let is_user = false;

    let data2 = {
      app_id,
      user_id,
      is_admin,
      is_user
    };

    const result2 = await axios.post(`/api/post/role`, data2).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result2);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Create App</h2>
      <form onSubmit={postApp}>
        <input type="text" name="name" />
        <button type="submit">Save</button>
      </form>
      <h2>My Apps:</h2>
      <button onClick={getApps}>Get Apps</button>
    </div>
  );
};

export default Dashboard;
