import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import { Spin } from 'antd';
import axios from '../../../services/axios';
import Button from '../../../components/Common/buttons/OriginalButton';

const Wrapper = styled.div`
  padding: 1.5;
  background-color: ${colors.white};
  margin-top: 1.25rem;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.375rem;
    padding: 1.5rem;
  }

  @media (min-width: ${breakpoints.large}) {
    width: 75%;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`;

const InputWrapper = styled.div`
  padding: 1.5rem;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`;

const TextArea = styled.textarea`
  ${fieldStyles}
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
        <Wrapper>
          <Spin tip="Loading..." spinning={isLoading}>
            <InputWrapper>
              <Label htmlFor="title">Title</Label>
              <Input onChange={handleTitleChange} value={formTitle} name="title" />
            </InputWrapper>
            <TextAreaWrapper>
              <Label htmlFor="description">Description</Label>
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
        </Wrapper>
      </form>
    </div>
  );
};

export default CreateTask;
