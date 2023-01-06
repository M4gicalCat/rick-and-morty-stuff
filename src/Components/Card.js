import styled from "styled-components";

export const Card = styled.div`
  padding: 1rem;
  margin: 0 auto 1rem auto;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  width: fit-content;
  > h1 {
    border-bottom: 1px solid ${({theme}) => theme.color.title};
    padding-bottom: 0.5rem;
  }
`;