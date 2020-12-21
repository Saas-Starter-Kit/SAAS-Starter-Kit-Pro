import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';

const admin = firebase.initializeApp();

const CheckUserExists = async (email) => {
  //check if email exists
  let text = `SELECT * FROM users
              WHERE email=$1`;

  let values = [email];

  let queryResult = await db.query(text, values).catch((err) => {
    console.log(err);
    throw new Error('Database Query Failed');
  });

  if (queryResult.rows.length != 0) {
    return { type: 'error', message: 'User Already Exists' };
  } else if (queryResult.rows.length === 0) {
    return { type: 'success', message: 'User Not Found' };
  } else {
    return { type: 'error', message: 'Database query failed' };
  }
};

const saveUsertoDB = async (email, username, firebaseId) => {
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

export const SignUp = async (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  let email = req.body.email;
  console.log(email, username, token);

  //First Check if User exists
  let userExists = await CheckUserExists(email).catch((err) => {
    console.log(err);
    res.status(500).send('Database Query Failed');
    throw new Error('Database Query Failed');
  });

  //handle database non-operational errors
  if (userExists.type === 'error') {
    res.status(500).send(userExists.message);
    throw new Error(userExists.message);
  }

  //if user not found, console.log and continue code execution
  if (userExists.type === 'success') {
    console.log('Success ', userExists.message);
  }

  //decode the firebase token recieved from frontend and save firebase uuid
  let decodedToken = await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error signing up');
      throw new Error('Firebase Token Decode error');
    });

  let firebaseId = decodedToken.user_id;

  //save user firebase info to our own db, and get unique user database id
  let databaseQuery = await saveUsertoDB(email, username, firebaseId).catch((err) => {
    console.log(err);
    res.status(500).send('Error signing up');
    throw new Error('Error Saving User Info to Database');
  });

  let userId = databaseQuery.rows[0].id;

  console.log(userId);

  res.send({ token: setToken(userId) });
};

export const Login = (req, res) => {
  let token = req.body.token;

  const CheckUserExists = (email) => {
    /* Check if users exists then jwt login */

    //check if email exists
    let query1 = `SELECT * FROM users
                  WHERE email=$1`;

    let values1 = [email];

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        let id = q_res.rows[0].id;
        console.log(id);
        res.send({ token: setToken(id) });
      }
      if (q_res.rows.length === 0) {
        //if email not found
        let response = {
          type: 'error',
          message: 'Email Not Found'
        };

        res.send(response);
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let email = decodedToken.email;

      CheckUserExists(email);
    })
    .catch((error) => {
      res.send('error loggin in');
      console.log(error);
    });
};

export const updateUsername = (req, res) => {
  let id = req.body.id;
  let username = req.body.username;

  let text = `UPDATE users SET username=$1
              WHERE id = $2`;
  let values = [username, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

export const updateEmail = (req, res) => {
  let id = req.body.id;
  let email = req.body.email;

  let text = `UPDATE users SET email=$1
              WHERE id = $2`;
  let values = [email, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};
