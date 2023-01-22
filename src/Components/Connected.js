import {Container} from "./Container";
import {Info} from "./Info";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Connected = ({Component, hidden, reverse}) => {
  const uid = useSelector(state => state.auth?.id);
  if (reverse) {
    return uid ? null : Component;
  }
  return uid ? Component : (!hidden &&
    <Container>
      <Info>
        <h1>Vous y êtes presque</h1>
        <p>Vous devez <Link to={"/auth/login"}>vous connecter</Link> pour accéder à cette page.</p>
      </Info>
    </Container>
  );
}