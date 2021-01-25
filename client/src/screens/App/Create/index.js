import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import { colors } from '../../../styles/theme';
import { Spin } from 'antd';
import axios from '../../../services/axios';
import Button from '../../../components/Common/buttons/OriginalButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';

const Title = styled.h1`
  font-size: 1.25rem;
`;

const InputWrapper = styled.div`
  padding: 1.5rem;
`;

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`;

const ButtonWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  text-align: left;
`;

const CreateTask = ({ app_id }) => {
  const [formTitle, setTitle] = useState('');
  const [formDescription, setDescription] = useState('');
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const context = useContext(AuthContext);
  const { authState } = context;
  const { user } = authState;

  const postTodo = async (event) => {
    event.preventDefault();
    fetchInit();
    let author = user ? user.username : 'Guest';
    let title = event.target.title.value;
    let description = event.target.description.value;
    let data = { title, description, author, app_id };

    await axios.post(`/api/post/todo`, data).catch((err) => {
      fetchFailure(err);
    });

    setTitle('');
    setDescription('');
    fetchSuccess();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <Title>Create Todo</Title>
      <form onSubmit={postTodo}>
        <Card>
          <Spin tip="Loading..." spinning={isLoading}>
            <InputWrapper>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <TextInput onChange={handleTitleChange} value={formTitle} name="title" />
            </InputWrapper>
            <TextAreaWrapper>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <TextArea onChange={handleDescChange} value={formDescription} name="description" />
            </TextAreaWrapper>
            <ButtonWrapper>
              <Button
                textColor={colors.white}
                backgroundColor={colors.indigo600}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Save
              </Button>
            </ButtonWrapper>
          </Spin>
        </Card>
      </form>
    </div>
  );
};

export default CreateTask;
