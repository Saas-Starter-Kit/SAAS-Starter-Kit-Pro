import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';

const admin = firebase.initializeApp();

const CheckUserExists = async (email, next) => {
  //check if email exists
  let text = `SELECT * FROM users
              WHERE email=$1`;

  let values = [email];

  let queryResult = await db.query(text, values).catch((err) => {
    console.log(err);
    return { type: 'error', message: 'Database query failed' };
  });

  if (!queryResult) {
    return { type: 'error', message: 'Database query failed' };
  } else if (queryResult.rows.length != 0) {
    return { type: 'error', message: 'User Already Exists' };
  } else if (queryResult.rows.length === 0) {
    return { type: 'success', message: 'User Not Found' };
  } else {
    return { type: 'error', message: 'Database query failed' };
  }
};

export const SignUp = async (req, res, next) => {
  let token = req.body.token;
  let username = req.body.username;

  let email = req.body.email;
  console.log(email);

  let userExists = await CheckUserExists(email, next).catch((err) => {
    console.log(err);
    res.status(500).send('Database query failed');
    throw new Error('Database query Failed');
  });

  if (!userExists) {
    res.status(500).send('Database query failed');
  } else if (userExists.type === 'error') {
    res.status(500).send(userExists.message);
  } else if (userExists.type === 'success') {
    //res.status(500).send(userExists.message);
  }

  console.log(userExists);
  //let token = req.body.token;
  //let username = req.body.username;
  //const saveUsertoDB = (email, username) => {
  /* Save user to our own db and get unique key from db */
  //  //if email not found insert into database
  //  let query2 = `INSERT INTO users (username, email)
  //              VALUES($1, $2)
  //              RETURNING id`;
  //  let values2 = [username, email];
  //  //signup user, called inside callback1
  //  let callback2 = (q_err, q_res) => {
  //    if (q_err) {
  //      console.log(q_err);
  //      res.status(500).send(q_err);
  //    }
  //    //send back user id after signup
  //    if (q_res.rows[0]) {
  //      let id = q_res.rows[0].id;
  //      console.log(q_res.rows);
  //      //jwt token login after signup
  //      res.send({ token: setToken(id) });
  //    }
  //  };
  //  //check if user exists
  //};
  //admin
  //  .auth()
  //  .verifyIdToken(token)
  //  .then((decodedToken) => {
  //    let name = username ? username : decodedToken.email;
  //    let email = decodedToken.email;
  //    saveUsertoDB(email, name);
  //  })
  //  .catch((error) => {
  //    res.send('error signing up');
  //    console.log(error);
  //  });
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
