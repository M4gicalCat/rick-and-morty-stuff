import {Container} from "./Container";
import {auth, db} from "../firebase/init";
import {useEffect, useState} from "react";
import {Info} from "./Info";
import {Link} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {setFavoris} from "../store/FavorisSlice";
import {child, get, ref, set} from "firebase/database";

export const Connected = ({Component, hidden}) => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const favoris = useSelector(state => state.favoris);

  useEffect(() => {

    if (!uid) return;
    set(ref(db, `users/${uid}`), favoris).then();
  }, [favoris]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        get(child(ref(db), `users/${user.uid}/favoris`)).then(snapshot => {
          dispatch(setFavoris(snapshot.val() ?? []));
        }).catch(console.error);
      } else {
        setUid(null);
        dispatch(setFavoris(null));
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