import { CreateCustomer } from '../stripe/stripeCustomer.js';
import { CreateOrgModel, SetOrgStripeId } from '../../Model/sql/org/org.js';
import db from '../../Database/sql/db.js';

export const CreateOrg = async (req, res) => {
  let primary_email = req.body.email;
  let org_name = req.body.org_name;
  let user_id = req.body.userId;
  let role = req.body.role;

  let org_id = await CreateOrgModel(primary_email, org_name);

  let stripe_id = await CreateCustomer(primary_email, org_id);

  await SetOrgStripeId(stripe_id.id, org_id);

  let text = `INSERT INTO roles(org_id, user_id, role)
              VALUES($1, $2, $3)`;

  let values = [org_id, user_id, role];

  await db.query(text, values);

  res.status(200).send({ stripe_id: stripe_id.id, org_id });
};
