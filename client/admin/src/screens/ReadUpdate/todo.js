import styled from 'styled-components';
import { colors } from '../../styles/theme';

const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const EditButton = styled(Button)`
  background-color: ${colors.indigo600};
`;

const DeleteButton = styled(Button)`
  background-color: ${colors.red500};
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
      <EditButton onClick={() => editTodo(todo)}>Edit</EditButton>
      <DeleteButton onClick={() => deleteTodo(todo)}>Delete</DeleteButton>
    </ButtonsWrapper>
    {isEditting && todo.todo_id === editTodoID && (
      <Form onSubmit={(event) => putTodo(event, todo)}>
        <TitleWrapper>
          <Label>Title:</Label>
          <Input onChange={handleEditTitleChange} value={editTitle} name='title' />
        </TitleWrapper>
        <DescriptionWrapper>
          <Label>Description:</Label>
          <TextArea onChange={handleEditDescChange} value={editDescription} name='description' />
        </DescriptionWrapper>
        <FormButtonsWrapper>
          <SendButton type='submit'>Send</SendButton>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </FormButtonsWrapper>
      </Form>
    )}
    <hr />
  </Wrapper>
);

export default Todo;
