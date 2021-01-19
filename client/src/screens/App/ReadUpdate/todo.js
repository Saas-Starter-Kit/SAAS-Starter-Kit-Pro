import React from 'react';
import styled from 'styled-components';
import Can from '../../../services/casl';
import { colors } from '../../../styles/theme';
import Button from '../../../components/Common/buttons/OriginalButton';

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const DeleteButton = styled(Button)`
  margin-left: 1rem;
`;

const Form = styled.form`
  background-color: ${colors.gray50};
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  padding-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.25rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  height: 6rem;
  padding: 0.25rem;
`;

const FormButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const SendButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-self: center;
  width: 50%;
  padding: 0.5rem 1rem;
  background-color: blue;
  color: ${colors.white};
  border: none;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
`;

const Todo = ({
  todo,
  isEditting,
  editTodoID,
  handleEditTitleChange,
  editTitle,
  handleEditDescChange,
  editDescription,
  editTodo,
  deleteTodo,
  putTodo,
  setEdit
}) => (
  <Wrapper>
    <h4>{todo.title}</h4>
    <p>{todo.description}</p>
    <ButtonsWrapper>
      <Button
        onClick={() => editTodo(todo)}
        backgroundColor={colors.indigo600}
        textColor={colors.white}
        hoverBackgroundColor={colors.indigo500}
        activeBackgroundColor={colors.indigo600}
      >
        Edit
      </Button>
      <Can I="delete" a="Post" passThrough>
        {(allowed) => (
          <DeleteButton
            disabled={!allowed}
            onClick={() => deleteTodo(todo)}
            backgroundColor={colors.red500}
            textColor={colors.white}
            hoverBackgroundColor={colors.indigo500}
            activeBackgroundColor={colors.indigo600}
          >
            Delete
          </DeleteButton>
        )}
      </Can>
    </ButtonsWrapper>
    {isEditting && todo.todo_id === editTodoID && (
      <Form onSubmit={(event) => putTodo(event, todo)}>
        <TitleWrapper>
          <Label>Title:</Label>
          <Input onChange={handleEditTitleChange} value={editTitle} name="title" />
        </TitleWrapper>
        <DescriptionWrapper>
          <Label>Description:</Label>
          <TextArea onChange={handleEditDescChange} value={editDescription} name="description" />
        </DescriptionWrapper>
        <FormButtonsWrapper>
          <SendButton type="submit">Send</SendButton>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </FormButtonsWrapper>
      </Form>
    )}
    <hr />
  </Wrapper>
);

export default Todo;
