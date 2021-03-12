import db from '../../../Database/sql/db.js';

export const CreateOrgModel = async (primary_email, org_name) => {
  let text = `INSERT INTO organization(primary_email, org_name)
              VALUES($1, $2)
              RETURNING id`;

  let values = [primary_email, org_name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0].id;
};

export const SetOrgStripeId = async (stripe_id, org_id) => {
  let text = `UPDATE organization SET stripe_customer_id=$1 WHERE id=$2`;

  let values = [stripe_id, org_id];

  await db.query(text, values);
};
