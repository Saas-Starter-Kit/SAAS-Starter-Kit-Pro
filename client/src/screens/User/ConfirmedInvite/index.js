import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import { Link } from 'gatsby';

const ConfirmedInvite = ({ location }) => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const splitPath = location.pathname.split('/');
  const app_id = splitPath[3];

  useEffect(() => {
    if (authState.user) createRole();
  }, [authState]);

  const createRole = async () => {
    fetchInit();
    let user_id = authState.user.id;
    let role = 'user';

    let data = {
      app_id,
      user_id,
      role
    };

    const result = await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });
    console.log(result);
    fetchSuccess();
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div>Your invite to the app has been confirmed, click below to navigate to the app</div>
      <Link to={`/app/${app_id}/dashboard`}>Go to App </Link>
    </div>
  );
};

export default ConfirmedInvite;
