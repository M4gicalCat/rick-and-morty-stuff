import {Spinner} from "./Spinner";
import {useEffect, useState} from "react";
import {addPersonnages, SmallPersonnage} from "./Personnage";
import {endPoint} from "../Model";
import {Infos} from "./AllEpisodes";
import {Title} from "./Title";
import styled from "styled-components";
import {useWindowSize} from "../hooks";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 2rem;
`;

export const AllPersonnages = () => {
  const [loading, setLoading] = useState(false);
  const [personnages, setPersonnages] = useState([]);
  const [info, setInfo] = useState({});
  const [link, setLink] = useState(`${endPoint}/character`);
  const width = useWindowSize();

  const load = async () => {
    const {info, results} = await (await fetch(link)).json();
    setInfo(info);
    setPersonnages(results);
    addPersonnages(results);
  }

  useEffect(() => {
    setLoading(true);
    load().then(() => setLoading(false));
  }, [link]);

  return (
    <>
      <Title>Tous les personnages</Title>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <Container>
            {personnages.map(perso => <SmallPersonnage card={width >= 500} perso={perso} key={perso.id}/>)}
          </Container>
          <Infos infos={info} setLink={setLink} />
        </>
      )}
    </>
  );
};