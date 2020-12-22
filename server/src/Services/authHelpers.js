import db from '../Database/db.js';

export const getUser = async (email) => {
  //check if email exists
  let text = `SELECT * FROM users
              WHERE email=$1`;

  let values = [email];

  let queryResult = await db.query(text, values).catch((err) => {
    console.log(err);
    throw new Error('Database Query Failed');
  });

  if (queryResult.rows.length === 0) {
    return { message: 'User Not Found' };
  } else {
    return queryResult;
  }
};

export const saveUsertoDB = async (email, username, firebaseId) => {
  /* Save user to our own db and get unique key from db */

  //insert into database
  let text = `INSERT INTO users (username, email, firebase_user_id)
              VALUES($1, $2, $3)
              RETURNING id`;

  let values = [username, email, firebaseId];

  let queryResult = await db.query(text, values).catch((err) => {
    console.log(err);
    throw new Error('Database Query Failed');
  });

  return queryResult;
};
