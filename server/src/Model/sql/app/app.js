import db from '../../../Database/sql/db.js';

export const getAppModel = async (user_id) => {
  let text = `
      SELECT
        a.app_id,
        a.app_name,
        r.user_id,
        r.role
      FROM
        apps a
      INNER JOIN roles r 
          ON r.app_id = a.app_id
      WHERE r.user_id=$1
  `;

  let values = [user_id];

  let queryResult = await db.query(text, values);
  return queryResult.rows;
};

export const postAppModel = async (name) => {
  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const deleteAppModel = async (app_id) => {
  let roleText = `DELETE FROM roles WHERE app_id=$1`;
  let roleValues = [app_id];

  let appText = `DELETE FROM apps WHERE app_id=$1`;
  let appValues = [app_id];

  let todosText = `DELETE FROM todos WHERE app_id=$1`;
  let todosValues = [app_id];

  await db.query(roleText, roleValues);

  await db.query(appText, appValues);

  await db.query(todosText, todosValues);

  return;
};
