import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';

const admin = firebase.initializeApp();

//sign in or sign up user then send jwt token
export const LoginOrSignUp = (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  console.log(username);

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let name = username;
      let email = decodedToken.email;
      console.log(name, email);

      saveUsertoDB(email, name);
    })
    .catch((error) => {
      res.send('error loggin in');
      console.log(error);
    });

  const saveUsertoDB = (email, username) => {
    /* Save user to our own db and get unique key from db */

    //check if email exists
    let query1 = `SELECT * FROM users
                  WHERE email=$1`;

    //if email not found insert into database
    let query2 = `INSERT INTO users (username, email)
                  VALUES($1, $2)
                  RETURNING id`;

    let values1 = [email];

    let values2 = [username, email];

    //signup user, called inside callback1
    let callback2 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      //send back user id after signup
      if (q_res.rows[0]) {
        let id = q_res.rows[0].id;

        //jwt token login after signup
        res.send({ token: setToken(id) });
      }
    };

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        let id = q_res.rows[0].id;

        res.send({ token: setToken(id) });
      }
      if (q_res.rows.length === 0) {
        //if email not found, create user in db
        db.query(query2, values2, callback2);
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };
};
