import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Empty } from 'antd';

import SEO from '../../../components/Marketing/Layout/seo';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Card from '../../../components/Common/Card';

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

const TeamApps = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess } = useContext(ApiContext);
  const [teamApps, setTeamApps] = useState([]);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  /* eslint-disable */
  useEffect(() => {
    if (authState.user.id) {
      getApps();
    }
  }, [authState]);
  /* eslint-enable */

  const getApps = async () => {
    fetchInit();
    let user_id = authState.user.id;

    let params = {
      user_id
    };

    const result = await axios.get(`/api/org`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    let userApps = result.data.filter((item) => item.role === 'user');

    setTeamApps(userApps);
    fetchSuccess();
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Team Apps page',
    description: 'Saas Starter Kit Pro Team Apps page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <div>
          <h1>Team Apps:</h1>
            {teamApps.length !== 0 ? (
              teamApps.map((org) => (
                <Link key={org.id} href={`/app/${org.id}/dashboard`}>
                  <a>
                    <StyledCard>
                      <StyledLink>{org.org_name}</StyledLink>
                      <RoleText>Role: user</RoleText>
                    </StyledCard>
                  </a>
                </Link>
              ))
            ) : (
              <Empty />
              )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamApps;
