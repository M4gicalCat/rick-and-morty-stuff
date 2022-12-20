import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({theme}) => theme.color.button.background};
  border: none;
  color: ${({theme}) => theme.color.button.text};
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
`;