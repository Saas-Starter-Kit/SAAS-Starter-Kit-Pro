var express = require('express');
var router = express.Router();
var db = require('../Database/db');

const requireAuth = require('../Authentication/passportConfig').requireAuth;

/* 
To make authenticated request simply add requireAuth as the second arguement in router()

router.get('/get/todos', requireAuth, getTodos);
*/

/* Get Todos */

const getTodos = (req, res) => {
  let author = req.query.author;

  let text = `SELECT * FROM TODOS WHERE author=$1`;
  let values = [author];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.get('/get/todos', getTodos);

/* Post Todos */

const postTodo = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;

  console.log(req.body);

  let text = `INSERT INTO todos(title, description, author)
              VALUES ($1, $2, $3)`;
  let values = [title, description, author];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.post('/post/todo', postTodo);

/* Edit Todo */

const putTodo = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let todo_id = req.body.todo_id;

  let text = `UPDATE todos SET title= $1, description=$2, author=$3
              WHERE todo_id = $4`;
  let values = [title, description, author, todo_id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.put('/put/todo', putTodo);

/* Delete Todo */

const deleteTodo = (req, res) => {
  let todo_id = req.body.todo_id;

  let text = `DELETE FROM todos 
              WHERE todo_id=$1`;
  let values = [todo_id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.delete('/delete/todo', deleteTodo);

module.exports = router;
