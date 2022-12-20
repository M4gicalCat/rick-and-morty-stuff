import styled from "styled-components";

export const ActionButton = styled.button`
  background-color: transparent;
  width: min-content;
  height: min-content;
  padding: 0;
  border: none;
  cursor: pointer;
  outline: none;
  transition-duration: .25s;
  &:hover {
    transform: scale(1.3);
  }
`;