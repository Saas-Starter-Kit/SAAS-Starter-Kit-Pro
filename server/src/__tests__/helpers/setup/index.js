import db from '../../Database/sql/db.js';

export const createApp = async (name) => {
  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const createUser = async (email, username, firebaseId) => {
  let text = `INSERT INTO users (username, email, firebase_user_id)
              VALUES($1, $2, $3)
              RETURNING id`;
  let values = [username, email, firebaseId];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};
