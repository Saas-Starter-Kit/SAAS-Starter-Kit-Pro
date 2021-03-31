import express from 'express';
import { getTodos, postTodo, putTodo, deleteTodo } from '../Services/todos/todos.js';
import { asyncHandler } from '../Middleware/asyncErrorHandler.js';
import { requireAuth } from '../Middleware/auth.js';
const router = express.Router();

/* Get Todos */
router.get('/get/todos', requireAuth, asyncHandler(getTodos));

/* Post Todos */
router.post('/post/todo', requireAuth, asyncHandler(postTodo));

/* Edit Todo */
router.put('/put/todo', requireAuth, asyncHandler(putTodo));

/* Delete Todo */
router.delete('/delete/todo', requireAuth, asyncHandler(deleteTodo));

export default router;
