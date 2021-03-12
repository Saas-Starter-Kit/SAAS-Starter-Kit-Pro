import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/theme';

import Button from '../../../components/Common/buttons/SecondaryButton';
import CancelButton from '../../../components/Common/buttons/CancelButton';
import DangerButton from '../../../components/Common/buttons/DangerAltButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormButtonsWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
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
    <div>{todo.description}</div>
    <p>By {todo.author}</p>
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

      <DangerButton
        onClick={() => deleteTodo(todo)}
        backgroundColor={colors.red500}
        textColor={colors.white}
        hoverBackgroundColor={colors.indigo500}
        activeBackgroundColor={colors.indigo600}
      >
        Delete
      </DangerButton>
    </ButtonsWrapper>
    {isEditting && todo.todo_id === editTodoID && (
      <form onSubmit={(event) => putTodo(event, todo)}>
        <Card>
          <TitleWrapper>
            <FieldLabel>
              Title
              <TextInput onChange={handleEditTitleChange} value={editTitle} name="title" />
            </FieldLabel>
          </TitleWrapper>
          <DescriptionWrapper>
            <FieldLabel>
              Description
              <TextArea
                onChange={handleEditDescChange}
                value={editDescription}
                name="description"
              />
            </FieldLabel>
          </DescriptionWrapper>
          <FormButtonsWrapper>
            <Button
              type="submit"
              backgroundColor={colors.indigo600}
              textColor={colors.white}
              hoverBackgroundColor={colors.indigo500}
              activeBackgroundColor={colors.indigo600}
            >
              Send
            </Button>
            <CancelButton
              onClick={() => setEdit(false)}
              backgroundColor={colors.red500}
              textColor={colors.white}
              hoverBackgroundColor={colors.indigo500}
              activeBackgroundColor={colors.indigo600}
            >
              Cancel
            </CancelButton>
          </FormButtonsWrapper>
        </Card>
      </form>
    )}
    <hr />
  </Wrapper>
);

export default Todo;
