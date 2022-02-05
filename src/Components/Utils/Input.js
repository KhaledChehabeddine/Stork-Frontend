import styled from "styled-components";

const Input = styled.input`
  font-family: inherit;
  margin: 1rem;
  height: 30px;
  width: 300px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 550;
  border: 2px solid;
  border-color: gray;
  border-radius: 12px;
  text-indent: 1rem;
  display: flex;
  flex-direction: row;
  transition: background 200ms ease-in, color 200ms ease-in, transform 200ms ease-in;
  &:hover {
    background: #E6E6E6;
    transform: scale(1.02);
  }
`

export default Input;
