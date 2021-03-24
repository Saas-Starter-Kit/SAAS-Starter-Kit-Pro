import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { useLocation } from '@reach/router';

import AuthContext from '../utils/authContext';
import CaslContext from '../utils/caslContext';
import ApiContext from '../utils/apiContext';
import OrgContext from '../utils/orgContext';
import { getRole } from './helpers';

import Layout from '../components/App/AppLayout';
import { OrgSettings, PaymentSettings, SubscriptionSettings } from '../screens/App/Settings';
import {
  Create,
  Dashboard,
  ReadUpdate,
  Permissions,
  Onboarding,
  Users,
  MachineLearning
} from '../screens/App';

const Routes = () => {
  const location = useLocation();
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const { SetOrg } = useContext(OrgContext);
  const { fetchFailure } = useContext(ApiContext);
  const splitPath = location.pathname.split('/');
  const org_id = splitPath[2];

  /* eslint-disable */
  useEffect(() => {
    if (authState.user.id) getRole(org_id, ability, authState, SetOrg, fetchFailure);
  }, [authState]);
  /* eslint-enable */

  return (
    <Layout org_id={org_id}>
      <Router>
        {/*<PrivateRoute path="/app/:id/dashboard" component={Dashboard} app_id={app_id} />*/}
        <Dashboard org_id={org_id} path="/app/:id/dashboard" />
        <Create org_id={org_id} path="/app/:id/create" />
        <ReadUpdate org_id={org_id} path="/app/:id/readupdate" />
        <Permissions org_id={org_id} path="/app/:id/permissions" />
        <Users org_id={org_id} path="/app/:id/users" />
        <Onboarding org_id={org_id} path="/app/:id/onboarding" />
        <MachineLearning org_id={org_id} path="/app/:id/machinelearning" />
        <OrgSettings org_id={org_id} path="/app/:id/settings/" />
        <PaymentSettings org_id={org_id} path="/app/:id/settings/payment" />
        <SubscriptionSettings org_id={org_id} path="/app/:id/settings/subscription" />
      </Router>
    </Layout>
  );
};

export default Routes;
