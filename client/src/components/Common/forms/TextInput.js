import styled from 'styled-components';

//const TextInput = styled.input`
//  background-color: #ffffff;
//  border-color: #d2d6dc;
//  border-width: 1px;
//  border-radius: 0.375rem;
//  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
//  font-size: 1rem;
//  line-height: 1.5;
//  margin-top: 0.25rem;
//  display: block;
//  width: 100%;
//  line-height: 1.25rem;
//`;

const TextInput = styled.input`
  height: 34px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #fff, 0 1px 0 #fff;
`;

export default TextInput;
