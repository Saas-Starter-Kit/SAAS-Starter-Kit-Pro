import express from 'express';
import { getTodos, postTodo, putTodo, deleteTodo } from '../Services/todos/todos.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';

const router = express.Router();

/* Get Todos */
router.get('/get/todos', asyncHandler(getTodos));

/* Post Todos */
router.post('/post/todo', asyncHandler(postTodo));

/* Edit Todo */
router.put('/put/todo', asyncHandler(putTodo));

/* Delete Todo */
router.delete('/delete/todo', asyncHandler(deleteTodo));

export default router;
