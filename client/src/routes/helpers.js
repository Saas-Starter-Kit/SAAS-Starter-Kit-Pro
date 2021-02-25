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

export const getRole = async (app_id, ability, authState, fetchFailure) => {
  let user_id = authState.user.id;

  let params = {
    user_id,
    app_id
  };

  const result = await axios.get(`/api/get/role`, { params }).catch((err) => {
    fetchFailure(err);
  });

  if (result.data.length == 0) {
    //navigate to 403 page
    navigate('/403');
  }

  let role = result.data[0].role;

  updateRole(ability, role);
};

//Use for Local testing of permissions, subsitute in for the role variable in updateRole()
//let userRole= 'user'
//let adminRole = 'admin'
