import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../utils/authContext';
import styled from 'styled-components';
import { fetchTodoApi, deleteTodoApi, putTodoApi } from '../../../api/todoApi';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const EditButtonRow = styled.div`
  display: flex;
  padding-bottom: 1em;
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-self: center;
  width: 50%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
`;

const ReadUpdate = () => {
  const [todos, setTodos] = useState(null);

  const context = useContext(AuthContext);
  const { authState } = context;
  const { user } = authState;

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTodos = async () => {
    let author = user ? user.username : 'Guest';
    let params = { author };

    let result = await fetchTodoApi(params);
    setTodos(result.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (todo) => {
    let todo_id = todo.todo_id;

    let data = { todo_id };
    deleteTodoApi(data);
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
    putTodoApi(data);
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
      <h1 className='text-xl'>Todos: </h1>

      <div className='bg-white rounded-md shawdow p-4'>
        {todos ? (
          todos.map((todo) => (
            <div className='py-4' key={todo.todo_id}>
              <h4>{todo.title}</h4>
              <p>{todo.description}</p>
              <EditButtonRow>
                <button
                  className='py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>

                <button
                  className='ml-4 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
                  onClick={() => deleteTodo(todo)}
                >
                  Delete
                </button>
              </EditButtonRow>

              {isEditting && todo.todo_id === editTodoID && (
                <form className='bg-gray-50 p-2 rounded' onSubmit={(event) => putTodo(event, todo)}>
                  <div className='flex flex-col mb-4'>
                    <label className='pb-2'>Title:</label>
                    <input
                      className='p-1'
                      onChange={handleEditTitleChange}
                      value={editTitle}
                      name='title'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='pb-2'>Description:</label>
                    <textarea
                      className='h-24 p-1'
                      onChange={handleEditDescChange}
                      value={editDescription}
                      name='description'
                    />
                  </div>
                  <div className='flex flex-col mb-4'>
                    <StyledButton type='submit'>Send</StyledButton>
                    <button onClick={() => setEdit(false)}>Cancel</button>
                  </div>
                </form>
              )}
              <hr />
            </div>
          ))
        ) : (
          <p> No Todos to Show...</p>
        )}
      </div>
    </StyledMain>
  );
};

export default ReadUpdate;
