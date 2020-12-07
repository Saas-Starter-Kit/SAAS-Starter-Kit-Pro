import React, { useState, useContext } from "react"
import styled from "styled-components"
import AuthContext from "../../../utils/authContext"
import { postTodoApi } from "../../../api/todoApi"
import { colors, breakpoints, fieldStyles } from "../../../styles/theme"

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
`

const Title = styled.h1`
  font-size: 1.25rem;
`

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`

const InputWrapper = styled.div`
  padding: 1.5rem;
`

const Input = styled.input`
  ${fieldStyles}
`

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`

const TextArea = styled.textarea`
  ${fieldStyles}
`

const ButtonWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  text-align: left;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`

const Response = styled.p`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const CreateTask = () => {
  const [formTitle, setTitle] = useState("")
  const [formDescription, setDescription] = useState("")

  const [resMessage, setResMessage] = useState("")

  const context = useContext(AuthContext)
  const { authState } = context
  const { user } = authState

  let handleRes = res => {
    console.log(res.statusText)
    if (res.statusText == "OK") {
      setResMessage("Successfully Submitted")
    } else {
      setResMessage("Request Failed Please Try Again")
    }
  }

  const postTodo = async event => {
    event.preventDefault()
    let author = user ? user.username : "Guest"
    let title = event.target.title.value
    let description = event.target.description.value
    let data = { title, description, author }

    let result = await postTodoApi(data)
    handleRes(result)

    setTitle("")
    setDescription("")
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDescChange = event => {
    setDescription(event.target.value)
  }

  return (
    <>
      <Title>Create Todo</Title>
      <form onSubmit={postTodo}>
        <Wrapper>
          <InputWrapper>
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleTitleChange}
              value={formTitle}
              name="title"
            />
          </InputWrapper>
          <TextAreaWrapper>
            <Label htmlFor="description">Description</Label>
            <TextArea
              onChange={handleDescChange}
              value={formDescription}
              name="description"
            />
          </TextAreaWrapper>
          <ButtonWrapper>
            <Button>Save</Button>
            <Response>{resMessage}</Response>
          </ButtonWrapper>
        </Wrapper>
      </form>
    </>
  )
}

export default CreateTask
