import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Card from '../../../components/Common/Card';

import { Button } from 'antd';
import PrimaryButton from '../../../components/Common/buttons/PrimaryButton';
import CancelButton from '../../../components/Common/buttons/CancelButton';
import DangerButton from '../../../components/Common/buttons/DangerButton';
import SecondaryButton from '../../../components/Common/buttons/SecondaryButton';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  max-width: 24rem;
  width: 100%;
`;

const RoleText = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 1.075rem;
  font-weight: 500;
  color: black;
`;

const StyledLink = styled.div`
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
`;

const DummyData = [
  { app_id: 1, app_name: 'app3' },
  { app_id: 2, app_name: 'app4' }
];

const TeamApps = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [teamApps, setTeamApps] = useState(DummyData);

  useEffect(() => {
    if (authState.user) {
      //  getApps();
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

    let userApps = result.data.filter((item) => item.role == 'user');

    setTeamApps(userApps);
  };

  return (
    <div>
      <div>
        <h1>Team Apps:</h1>
        {teamApps &&
          teamApps.map((app) => (
            <Link key={app.app_id} to={`/app/${app.app_id}/dashboard`} state={{ app }}>
              <StyledCard>
                <StyledLink>{app.app_name}</StyledLink>
                <RoleText>Role: user</RoleText>
              </StyledCard>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TeamApps;
