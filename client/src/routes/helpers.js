import React from 'react';
import { updateRole } from '../utils/caslAbility';
import axios from '../services/axios';
import { navigate } from 'gatsby';

//check token expires time on private routes
const isTokenValid = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
  return new Date().getTime() < expiresAt;
};

export const PrivateRoute = ({ component: Component, location, org_id, ...rest }) => {
  if (!isTokenValid()) {
    navigate('/auth/login');
    return null;
  } else if (!org_id) {
    navigate('/user/dashboard');
    return null;
  } else {
    return <Component {...rest} />;
  }
};

export const getRole = async (org_id, ability, authState, SetOrg, fetchFailure) => {
  let user_id = authState.user.id;

  let params = {
    user_id,
    org_id
  };

  const result = await axios.get(`/api/get/role`, { params }).catch((err) => {
    fetchFailure(err);
  });

  if (result.data.length === 0) {
    navigate('/403');
  }

  let id = result.data[0].id;
  let org_name = result.data[0].org_name;
  let primary_email = result.data[0].primary_email;
  let role = result.data[0].role;
  let stripe_customer_id;
  let subscription_id;

  //save payment info to global state if role is admin
  if (role === 'admin') {
    stripe_customer_id = result.data[0].stripe_customer_id;
    subscription_id = result.data[0].subscription_id;
  }

  let org = {
    id,
    org_name,
    primary_email,
    role,
    stripe_customer_id,
    subscription_id
  };

  SetOrg(org);

  updateRole(ability, role);
};
