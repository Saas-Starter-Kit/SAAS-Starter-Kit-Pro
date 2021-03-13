import { CreateCustomer } from '../stripe/stripeCustomer.js';
import {
  CreateOrgModel,
  SetOrgStripeId,
  GetOrgModel,
  DeleteOrgModel
} from '../../Model/sql/org/org.js';
import { CreateOrgRole } from '../../Model/sql/roles/roles.js';

export const CreateOrg = async (req, res) => {
  let primary_email = req.body.email;
  let org_name = req.body.org_name;
  let user_id = req.body.user_id;
  let role = req.body.role;

  let org_id = await CreateOrgModel(primary_email, org_name);

  let stripe_id = await CreateCustomer(primary_email, user_id, org_id);

  await SetOrgStripeId(stripe_id.id, org_id);

  await CreateOrgRole(org_id, user_id, role);

  res.status(200).send('Org Created');
};

export const GetOrgs = async (req, res) => {
  let user_id = req.query.user_id;

  let result = await GetOrgModel(user_id);

  res.status(200).send(result);
};

export const DeleteOrg = async (req, res) => {
  let org_id = req.query.org_id;

  await DeleteOrgModel(org_id);

  res.status(200).send('Delete Successful');
};