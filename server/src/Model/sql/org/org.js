import db from '../../../Database/sql/db.js';

export const CreateOrgModel = async (primary_email, org_name) => {
  let text = `INSERT INTO organizations(primary_email, org_name)
              VALUES($1, $2)
              RETURNING id`;

  let values = [primary_email, org_name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0].id;
};

export const GetOrgModel = async (user_id) => {
  let text = `
      SELECT
        o.id,
        o.org_name,
        r.user_id,
        r.role
      FROM
        organizations o
      INNER JOIN roles r 
          ON r.org_id = o.id
      WHERE r.user_id=$1
  `;

  let values = [user_id];

  let queryResult = await db.query(text, values);
  return queryResult.rows;
};

export const SetOrgStripeId = async (stripe_id, org_id) => {
  let text = `UPDATE organizations SET stripe_customer_id=$1 WHERE id=$2`;

  let values = [stripe_id, org_id];

  await db.query(text, values);
};

export const DeleteOrgModel = async (org_id) => {
  let roleText = `DELETE FROM roles WHERE org_id=$1`;
  let roleValues = [org_id];

  let appText = `DELETE FROM organizations WHERE id=$1`;
  let appValues = [org_id];

  let todosText = `DELETE FROM todos WHERE org_id=$1`;
  let todosValues = [org_id];

  await db.query(roleText, roleValues);

  await db.query(appText, appValues);

  await db.query(todosText, todosValues);

  return;
};

export const PutOrgModel = async (org_id, org_name) => {
  let text = `UPDATE organizations SET org_name=$2 
              WHERE id=$1`;

  let values = [org_id, org_name];

  await db.query(text, values);
};
