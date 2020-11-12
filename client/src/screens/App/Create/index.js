import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../utils/authContext';
import axios from 'axios';

const CreateTask = () => {
  const [formTitle, setTitle] = useState('');
  const [formDescription, setDescription] = useState('');

  const [resMessage, setResMessage] = useState('');

  const context = useContext(AuthContext);
  const { authState } = context;
  const { user } = authState;

  let handleRes = (res) => {
    console.log(res.statusText);
    if (res.statusText == 'OK') {
      setResMessage('Successfully Submitted');
    } else {
      setResMessage('Request Failed Please Try Again');
    }
  };

  const postTodo = async (event) => {
    event.preventDefault();
    let author = user ? user.username : 'Guest';
    let title = event.target.title.value;
    let description = event.target.description.value;

    let data = { title, description, author };
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/todo`, data)
      .then((res) => handleRes(res));
    setTitle('');
    setDescription('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <h1 className='text-xl'>Create Todo</h1>
      <div class='mt-5 w-3/4'>
        <form onSubmit={postTodo}>
          <div class='shadow overflow-hidden sm:rounded-md'>
            <div class='px-4 py-5 bg-white sm:p-6'>
              <div class='flex flex-col'>
                <div class='py-6 px-6'>
                  <label htmlFor='title' class='block text-sm font-medium leading-5 text-gray-700'>
                    Title
                  </label>
                  <input
                    onChange={handleTitleChange}
                    value={formTitle}
                    name='title'
                    class='mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                  />
                </div>

                <div class='px-6'>
                  <label
                    htmlFor='description'
                    class='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Description
                  </label>
                  <textarea
                    onChange={handleDescChange}
                    value={formDescription}
                    name='description'
                    class='mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                  />
                </div>
                <div class='py-6 px-6 bg-white text-left'>
                  <button
                    type='submit'
                    class='py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out'
                  >
                    Save
                  </button>
                  <p className='py-4'>{resMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
