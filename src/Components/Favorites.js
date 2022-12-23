import {Title} from "./Title";
import {useEffect,  useState} from "react";
import {getPersonnages, SmallPersonnage} from "./Personnage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Spinner} from "./Spinner";

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
        <div>Vous n'avez aucun personnage favori, allez donc en choisir quelques uns.</div>
      )}
      <Container>
        {personnages.map(favori => <SmallPersonnage key={favori.id} card perso={favori} />)}
      </Container>
    </div>
  );
}