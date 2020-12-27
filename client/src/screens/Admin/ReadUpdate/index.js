import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { colors } from '../../../styles/theme';
import Todo from './todo';
import { Empty } from 'antd';
import axios from '../../../services/axios';

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
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { user } = authState;

  const [todos, setTodos] = useState([]);

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTodos = async () => {
    if (user) {
      let author = user.username;
      let params = { author };

      let result = await axios
        .get(`/api/get/todos`, {
          params
        })
        .catch((err) => {
          fetchFailure(err);
        });
      setTodos(result.data);
    } else {
      //show dummy data
    }
  };

  useEffect(() => {
    if (authState) fetchTodos();
  }, [authState]);

  const deleteTodo = async (todo) => {
    let todo_id = todo.todo_id;

    let data = { todo_id };
    await axios
      .delete(`/api/delete/todo`, {
        data
      })
      .catch((err) => {
        fetchFailure(err);
      });
    setEdit(false);
    setTimeout(() => fetchTodos(), 300);
  };

  const putTodo = async (event, todo) => {
    event.preventDefault();
    let title = event.target.title.value;
    let description = event.target.description.value;
    let author = user.username;
    let todo_id = todo.todo_id;

    let data = { title, description, author, todo_id };
    await axios.put(`/api/put/todo`, data).catch((err) => {
      fetchFailure(err);
    });
    setEdit(false);
    //Save data to context to limit api calls
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
        {!todos.length == 0 ? (
          todos.map((todo) => (
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
          ))
        ) : (
          <Empty />
        )}
      </Card>
    </StyledMain>
  );
};

export default ReadUpdate;
