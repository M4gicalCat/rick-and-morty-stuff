import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SpinnerItem = styled.div`
  width: 25px;
  height: 25px;
  border: 5px solid ${({theme}) => theme.color.spinner};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerItem/>
  </SpinnerContainer>
);