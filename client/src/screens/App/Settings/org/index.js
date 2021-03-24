import React, { useState, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import { Spin } from 'antd';
import OrgContext from '../../../../utils/orgContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import SEO from '../../../../components/Marketing/Layout/seo';
import styled from 'styled-components';

import DeleteAppModal from './DeleteOrgModal';
import SettingsHeader from '../../../../components/App/Navigation/settingsHeader';
import Card from '../../../../components/Common/Card';
import Label from '../../../../components/Common/forms/FieldLabel';
import TextInput from '../../../../components/Common/forms/TextInput';
import SecondaryButton from '../../../../components/Common/buttons/SecondaryButton';
import DangerButton from '../../../../components/Common/buttons/DangerButton';
import { FcHighPriority } from 'react-icons/fc';

const Title = styled.h1`
  font-size: 1.5rem;
`;

const StyledCard = styled(Card)`
  width: 24rem;
`;

const DangerCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;

const WarningWrapper = styled.div`
  display: flex;
`;

const DangerTitle = styled.h2`
  color: red;
  opacity: 80%;
`;

const StyledIcon = styled(FcHighPriority)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.6rem;
  margin-top: 0.3rem;
`;

const OrgSettings = ({ org_id }) => {
  const { orgState } = useContext(OrgContext);
  const { org_name, stripe_customer_id } = orgState;
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [orgName, setOrgName] = useState();
  const [isModal, setModal] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    setOrgName(org_name);
    return () => fetchSuccess();
  }, []);
  /* eslint-enable */

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchInit();
    let org_name = event.target.org_name.value;
    let data = { org_id, org_name };

    await axios.put('/api/org', data).catch((err) => {
      fetchFailure(err);
    });

    navigate('/user');
  };

  const handleOrgChange = (event) => {
    setOrgName(event.target.value);
  };

  const deleteOrg = async () => {
    setModal(false);
    fetchInit();
    let params = { org_id, stripe_customer_id };

    await axios.delete('/api/org', { params }).catch((err) => {
      fetchFailure(err);
    });

    navigate('/user');
  };

  const handleModal = () => {
    isModal ? setModal(false) : setModal(true);
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Account page',
    description: 'Saas Starter Kit Pro Account page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <SettingsHeader org_id={org_id} />
        <Title>Org Settings</Title>
        <Spin tip="Loading..." spinning={isLoading}>
          <StyledCard>
            <h2>Change Organization Name</h2>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="org_name">
                Organization Name
                <TextInput value={orgName} onChange={handleOrgChange} name="org_name" />
              </Label>
              <SecondaryButton type="submit">Submit</SecondaryButton>
            </form>
          </StyledCard>
        </Spin>
        <Spin tip="Loading..." spinning={isLoading}>
          <DangerCard>
            <WarningWrapper>
              <StyledIcon />
              <DangerTitle>Danger Area</DangerTitle>
            </WarningWrapper>
            <h2>Delete Organization</h2>
            <DangerButton onClick={() => handleModal()}>Delete</DangerButton>
          </DangerCard>
        </Spin>
      </div>
      <DeleteAppModal isModal={isModal} deleteOrg={deleteOrg} handleModal={handleModal} />
    </React.Fragment>
  );
};

export default OrgSettings;
