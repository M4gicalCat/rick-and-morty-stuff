import {Title} from "./Title";
import {useEffect,  useState} from "react";
import {getPersonnages, SmallPersonnage} from "./Personnage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Spinner} from "./Spinner";
import {Info} from "./Info";
import {Link} from "react-router-dom";
import {Button} from "./Button";

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

  useEffect(() => {
    setLoading(true);
    getPersonnages(favoris).then((p) => {
      setPersonnages(p);
      setLoading(false);
    });
  }, [favoris]);

  return (
    <div>
      <Title>Mes personnages favoris</Title>
      {loading && <Spinner />}
      {personnages.length === 0 && !loading && (
        <div style={{width: "calc(100% - 4rem)", display: "flex", flexDirection: "row", justifyContent: "center", margin: "3rem 2rem 0 2rem"}}>
          <Info>
            Vous n'avez aucun personnage favori, allez donc en choisir quelques uns.
            <div style={{marginTop: "1rem", display: "flex", flexDirection: "row", alignItems: "space-between", flexWrap: "wrap"}}>
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