import {Title} from "./Title";
import {useEffect,  useState} from "react";
import {SmallPersonnage} from "./Personnage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Spinner} from "./Spinner";
import {Info} from "./Info";
import {Link} from "react-router-dom";
import {Button} from "./Button";
import {usePersonnages, useWindowSize} from "../hooks";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 2rem;
`;

export const Favorites = () => {
  const favoris = useSelector(s => s.favoris.favoris);
  const [personnages, setPersonnages] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getPersonnages} = usePersonnages();
  const width = useWindowSize();

  useEffect(() => {
    setLoading(true);
    getPersonnages(favoris).then((p) => {
      setPersonnages(p);
      setLoading(false);
    });
  }, [favoris]);
  const small = width <= 700;
  return (
    <div>
      <Title>Mes personnages favoris</Title>
      {loading && <Spinner />}
      {personnages.length === 0 && !loading && (
        <div style={{width: "calc(100% - 2rem)", display: "flex", flexDirection: "row", justifyContent: "center", margin: "3rem 1rem 0 1rem"}}>
          <Info fullWidth={small} style={{textAlign: small ? "center" : undefined}}>
            Vous n'avez aucun personnage favori, allez donc en choisir quelques uns.
            <div style={{marginTop: "1rem", display: "flex", flexDirection: small ? "column" : "row", alignItems: small ? "center" : "space-between", flexWrap: "wrap"}}>
              <Link to="/episode"><Button>Voir les épisodes</Button></Link>
              <Link to="/personnages"><Button>Voir les personnages</Button></Link>
            </div>
          </Info>
        </div>
        )}
      <Container>
        {personnages.map(favori => <SmallPersonnage key={favori.id} card perso={favori} />)}
      </Container>
    </div>
  );
}