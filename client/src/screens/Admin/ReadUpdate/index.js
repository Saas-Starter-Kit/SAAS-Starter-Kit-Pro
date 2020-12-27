import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import { fetchTodoApi, deleteTodoApi, putTodoApi } from '../../../api/todoApi';
import { colors } from '../../../styles/theme';
import Todo from './todo';
import { Empty } from 'antd';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const Title = styled.h1`
  font-size: 1.25rem;
`;

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 0.375rem;
  padding: 1rem;
`;

const ReadUpdate = () => {
  const [todos, setTodos] = useState([]);

  const context = useContext(AuthContext);
  const { authState } = context;
  const { user } = authState;

  //set user

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTodos = async () => {
    let author = user ? user.username : 'Guest';
    let params = { author };

    let result = await axios.get(`${axiosBase}/api/get/todos`, {
      params
    });
    setTodos(result.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (todo) => {
    let todo_id = todo.todo_id;

    let data = { todo_id };
    await axios.delete(`${axiosBase}/api/delete/todo`, {
      data
    });
    setEdit(false);
    setTimeout(() => fetchTodos(), 300);
  };

  const putTodo = async (event, todo) => {
    event.preventDefault();
    let title = event.target.title.value;
    let description = event.target.description.value;
    let author = user ? user.username : 'Guest';
    let todo_id = todo.todo_id;

    let data = { title, description, author, todo_id };
    await axios.put(`${axiosBase}/api/put/todo`, data);
    setEdit(false);
    setTimeout(() => fetchTodos(), 300);
  };

  const editTodo = (todo) => {
    setEdit(true);
    setTodoID(todo.todo_id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleEditDescChange = (event) => {
    setEditDescription(event.target.value);
  };

  return (
    <StyledMain>
      <Title>Todos: </Title>
      <Card>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            isEditting={isEditting}
            editTodoID={editTodoID}
            handleEditTitleChange={handleEditTitleChange}
            editTitle={editTitle}
            handleEditDescChange={handleEditDescChange}
            editDescription={editDescription}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            putTodo={putTodo}
            setEdit={setEdit}
          />
        ))}
      </Card>

      <Empty />
    </StyledMain>
  );
};

export default ReadUpdate;
