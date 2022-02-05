import styled from "styled-components";

const Button = styled.button`
  padding: 1rem;
  font-family: inherit;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  border: 2px solid;
  background: transparent;
  color: black;
  border-color: black;
  border-radius: 12px;
  transition: background 200ms ease-in, color 200ms ease-in, border 200ms ease-in, transform 200ms ease-in;
  &:hover {
    background: #8FB0FF;
    border-color: #8FB0FF;
    color: white;
    transform: scale(1.02);
  }
`

export default Button;
