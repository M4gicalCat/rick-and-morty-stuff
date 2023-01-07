import {useEffect, useState} from "react";
import styled from "styled-components";

export const ErrorMessage = ({code}) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    switch (code) {
      case 'auth/email-already-exists':
        setMessage('Cette adresse email est déjà utilisée.');
        break;
      case 'auth/invalid-email':
        setMessage('Cette adresse email n\'est pas valide.');
        break;
      case 'auth/operation-not-allowed':
        setMessage('Cette opération n\'est pas autorisée.');
        break;
      case 'auth/weak-password':
        setMessage('Le mot de passe doit contenir au moins 6 caractères.');
        break;
      case 'auth/user-disabled':
        setMessage('Ce compte a été désactivé.');
        break;
      case 'auth/user-not-found':
        setMessage('Aucun compte n\'est associé à cette adresse email.');
        break;
      case 'auth/wrong-password':
        setMessage('Le mot de passe est incorrect.');
        break;
      default: setMessage('');
    }
  }, [code]);

  const Container = styled.div`
    text-align: justify;
    padding: 1rem;
    border: 1px solid ${({theme}) => theme.color.error.border};
    border-radius: 12px;
    margin: 1rem;
    background-color: ${({theme}) => theme.color.error.background};
    color: ${({theme}) => theme.color.error.text};
  `;

  return (
    <Container>
      {message}
    </Container>
  );
}