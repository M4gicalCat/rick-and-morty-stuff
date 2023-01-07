import {signOut, deleteUser} from "firebase/auth";
import { ref, remove } from "firebase/database";
import {auth, db} from "../firebase/init";
import {Title} from "./Title";
import {Button} from "./Button";
import {Card as GivenCard} from "./Card";
import styled from "styled-components";
import {useState} from "react";
import {ErrorMessage} from "./ErrorMessage";

const Card = styled(GivenCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;


export const Account = () => {
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);
  const deleteAccount = async () => {
    try {
      await remove(ref(db, `users/${auth.currentUser.uid}`));
      await deleteUser(auth.currentUser);
      await signOut(auth);
      setDeleted(true);
    } catch (e) {
      setError(e.code ?? e.message);
    }
  };


  return deleted ? (
    <Card>
      <Title>Mon compte</Title>
      <p>Votre compte a bien été supprimé</p>
    </Card>
  ) : (
    <Card>
      <Title>Mon compte</Title>
      <p>Email : {auth.currentUser.email}</p>
      <Button onClick={() => signOut(auth)}>Se déconnecter</Button>
      <Button danger onClick={deleteAccount}>Supprimer le compte</Button>
      <ErrorMessage code={error}/>
    </Card>
  );
};