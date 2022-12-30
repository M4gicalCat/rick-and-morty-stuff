import {Title} from "./Title";
import {CustomLink} from "./CustomLink";
import styled from "styled-components";

const Bg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({theme}) => theme.background};
`;

export const Error = () => (
  <Bg>
    <Title>Une erreur est survenue</Title>
    <Title small fullWidth>Veuillez <CustomLink to="#" onClick={() => window.location.reload()}>rafraichir la page</CustomLink>, ou retourner à l'<CustomLink to="/">accueil</CustomLink></Title>
  </Bg>
);