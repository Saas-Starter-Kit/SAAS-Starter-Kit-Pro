import express from 'express';
import { getTodos, postTodo, putTodo, deleteTodo } from '../Services/todosCRUD.js';

const router = express.Router();

/* Get Todos */
router.get('/get/todos', getTodos);

/* Post Todos */
router.post('/post/todo', postTodo);

/* Edit Todo */
router.put('/put/todo', putTodo);

/* Delete Todo */
router.delete('/delete/todo', deleteTodo);

export default router;
