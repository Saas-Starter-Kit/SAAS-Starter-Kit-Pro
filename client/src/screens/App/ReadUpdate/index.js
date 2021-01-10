import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { colors } from '../../../styles/theme';
import Todo from './todo';
import { Empty, Spin } from 'antd';
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

const todosDummy = [
  { app_id: 4, author: 'author1', description: 'description1', title: 'title1', todo_id: 1 },
  { app_id: 4, author: 'author1', description: 'description2', title: 'title2', todo_id: 2 },
  { app_id: 4, author: 'author2', description: 'description3', title: 'title3', todo_id: 3 }
];

const ReadUpdate = ({ app_id }) => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { user } = authState;

  const [todos, setTodos] = useState(todosDummy);

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTodos = async () => {
    fetchInit();
    if (user) {
      let params = { app_id };

      let result = await axios
        .get(`/api/get/todos`, {
          params
        })
        .catch((err) => {
          fetchFailure(err);
        });
      setTodos(result.data);
      console.log(result.data);
      fetchSuccess();
    } else {
      //show dummy data
      fetchSuccess();
    }
  };

  //useEffect(() => {
  //  if (authState) fetchTodos();
  //}, [authState]);

  const deleteTodo = async (todo) => {
    fetchInit();
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
    //Save data to context to limit api calls
    setTimeout(() => fetchTodos(), 300);
    fetchSuccess();
  };

  const putTodo = async (event, todo) => {
    event.preventDefault();
    fetchInit();
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
    fetchSuccess();
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
        <Spin tip="Loading..." spinning={isLoading}>
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
        </Spin>
      </Card>
    </StyledMain>
  );
};

export default ReadUpdate;
