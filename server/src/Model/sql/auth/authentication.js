import db from '../../../Database/sql/db.js';

export const getUser = async (email) => {
  //check if email exists
  let text = `SELECT * FROM users
              WHERE email=$1`;

  let values = [email];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const verifyUser = async (verify_key) => {
  //find by email, set email_verified and verify_key to empty
  let text = `UPDATE users SET verify_key=$1, is_email_verified=$2
              WHERE verify_key=$3
              RETURNING id, email, username`;

  let values = ['', 't', verify_key];
  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const saveUsertoDB = async (email, username, firebaseId, verifyKey) => {
  /* Save user to our own db and get unique key from db */

  //insert into database
  let text = `INSERT INTO users (username, email, firebase_user_id, verify_key)
              VALUES($1, $2, $3, $4)`;
  let values = [username, email, firebaseId, verifyKey];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const updateUsernameModel = async (username, id) => {
  let text = `UPDATE users SET username=$1
              WHERE id = $2`;
  let values = [username, id];

  await db.query(text, values);

  return;
};

export const updateEmailModel = async (email, id) => {
  let text = `UPDATE users SET email=$1
              WHERE id = $2`;
  let values = [email, id];

  await db.query(text, values);
  return;
};