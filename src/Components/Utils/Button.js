import styled from "styled-components";

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap');
  padding: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  border: 2px solid;
  background: transparent;
  color: black;
  border-color: black;
  border-radius: 12px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: background 200ms ease-in, color 200ms ease-in, border 200ms ease-in, transform 200ms ease-in;
  &:hover {
    color: black;
    transform: scale(1.03);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`

export default Button;
