import React from 'react';
import axios from '../../../services/axios';

const Dashboard = () => {
  const getApps = async (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    let name = event.target.name.value;

    let data = {
      name
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
    </div>
  );
};

export default Dashboard;
