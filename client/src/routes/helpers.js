import React from 'react';
import { updateRole } from '../utils/caslAbility';
import axios from '../services/axios';
import { navigate } from 'gatsby';

//check token expires time on private routes
const isTokenValid = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
  return new Date().getTime() < expiresAt;
};

export const PrivateRoute = ({ component: Component, location, app_id, ...rest }) => {
  if (!isTokenValid()) {
    navigate('/auth/login');
    return null;
  } else if (!app_id) {
    navigate('/user/dashboard');
    return null;
  } else {
    return <Component {...rest} />;
  }
};

export const getRole = async (app_id, ability) => {
  let user_id = 1;

  let params = {
    user_id,
    app_id
  };

  const result = await axios.get(`/api/get/role`, { params }).catch((err) => {
    //fetchFailure(err);
    console.log(err);
  });

  console.log(result);
  if (result.data.length == 0) {
    //navigate to forbiden page
  }

  let user = result.data[0];

  //let role = {
  //  is_user: user.is_user,
  //  is_admin: user.is_admin
  //};

  updateRole(ability, adminRole);
};

//Use for Local testing, subsitute in for the role variable in getRole()
const userRole = {
  is_user: true,
  is_admin: false
};

const adminRole = {
  is_user: false,
  is_admin: true
};
