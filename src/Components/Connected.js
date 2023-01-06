import {Container} from "./Container";
import {auth} from "../firebase/init";
import {useEffect, useState} from "react";
import {Info} from "./Info";
import {Link} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";

export const Connected = ({Component, hidden}) => {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, []);
  return uid ? Component : (!hidden &&
    <Container>
      <Info>
        <h1>Vous y êtes presque</h1>
        <p>Vous devez <Link to={"/auth/login"}>vous connecter</Link> pour accéder à cette page.</p>
      </Info>
    </Container>
  );
}