import styled from "styled-components";
import {themes} from "../themes";

const InfoContainer = styled.div`
  width: ${({fullWidth}) => fullWidth ? "100%" : "max-content"};
  background-color: ${({theme}) => theme.color.info.background};
  border: 1px solid ${({theme}) => theme.color.info.border};
  padding: 1rem;
  border-radius: 5px;
  color: ${({theme}) => theme.color.info.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 7px 0 ${({theme}) => theme.color.info.background};
  button {
    background-color: ${themes.dark.color.button.background};
  }
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({theme}) => theme.color.info.circle};
  color: ${({theme}) => theme.color.text};
  position: relative;
  top: -.5rem;
  right: -.5rem;
  text-align: center;
  padding: .25rem;
  font-family: sans-serif;
  align-self: flex-end;
`;

export const Info = ({children, fullWidth}) => (
  <InfoContainer fullWidth={fullWidth}>
    <Circle>i</Circle>
    {children}
  </InfoContainer>
);