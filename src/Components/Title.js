import styled from "styled-components";

export const Title = styled.h1`
  font-size: ${({small}) => small ? "1rem" : "2rem"};
  text-align: ${({align}) => align ?? "center"};
  margin: 1rem;
  color: ${({theme}) => theme.color.title};
  ${({underline}) => underline && `text-decoration: underline;`}
`;