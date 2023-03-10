import {endPoint} from "../Model";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {Title} from "./Title";
import {SmallPersonnage as Perso} from "./Personnage";
import {Spinner} from "./Spinner";
import {usePersonnages, useWindowSize} from "../hooks";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 5rem;
`;

const List = ({episodes}) => {
  return (
    <ListContainer>
      {episodes.length === 0 && <Spinner />}
      {episodes.map(episode =>
        <Episode
          key={episode.id}
          episode={episode}
        />
      )}
    </ListContainer>
  );
};

const Card = styled.div`
  padding: 1rem;
  ${({open, border = true, theme}) => open ? `
    margin-bottom: 1rem;
    ${border ? `border: 1px solid ${theme.color.border};` : ""}
    border-radius: 5px;`
  : 'padding-bottom: 0'}
`;

const CardContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
`;

export const Episode = ({episode, defaultOpen}) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const width = useWindowSize();

  return (
    <Card open={open} border={!defaultOpen}>
      <Title
        onClick={() => setOpen(o => !o || defaultOpen)}
        style={{cursor: "pointer"}}
        small={!defaultOpen}
        align="left"
      >
        {episode.episode} - {episode.name}
        {!defaultOpen && <FontAwesomeIcon style={{float: "right"}} icon={open ? faChevronUp : faChevronDown}/>}
      </Title>

      {open && (
        <div style={{marginLeft: "2rem"}}>
          <p>Sorti le {episode.air_date}</p>
          <p>{episode.characters.length} personnages :</p>
          <Personnages urls={episode.characters} card={width >= 500} defaultOpen={defaultOpen} />
        </div>
      )}
    </Card>
  );
};

const Personnages = ({urls, card, defaultOpen}) => {
  const [personnages, setPersonnages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {getPersonnages} = usePersonnages();

  const load = () => {
    if (loaded || loading) return;
    setLoading(true);
    getPersonnages(urls.map(u => u.split("/").pop())).then((persos) => {
      setPersonnages(persos);
      setLoading(false);
      setLoaded(true);
    });
  };
  if (defaultOpen) load();

  const Container = card ? CardContainer : "div";

  return (
    <div>
      {!loaded && !defaultOpen && <Button onClick={load}>{`Montrer les ${urls.length} personnages`}</Button>}
      {loading && <Spinner />}
      {personnages.length > 0 && (
        <Container>
          {personnages.map(perso => <Perso perso={perso} card={card} key={perso.id}/>)}
        </Container>
      )}
    </div>
  );
};

const Screen = styled.div`
  @media (min-width: 600px) {
    margin: 0 2rem;
    width: calc(100% - 4rem);
  }
  @media (max-width: 600px) {
    margin: 0 1rem;
    width: calc(100% - 2rem);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

export const Infos = ({infos, setLink}) => (
  <InfoContainer>
    <Button disabled={!infos.prev} onClick={() => setLink(infos.prev)}>
      <FontAwesomeIcon icon={faArrowLeft}/>
    </Button>
    <Button disabled={!infos.next} onClick={() => setLink(infos.next)}>
      <FontAwesomeIcon icon={faArrowRight}/>
    </Button>
  </InfoContainer>
);

export const AllEpisodes = () => {
  const [link, setLink] = useState(`${endPoint}/episode`);
  const getData = async () => (await fetch(link)).json();
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  useEffect(() => {
    getData().then(({info, results}) => {
      setEpisodes(results);
      setInfo(info);
    });
  }, [link]);
  return <>
    <Screen>
      <Title>Tous les ??pisodes</Title>
      <List episodes={episodes}/>
      <Infos infos={info} setLink={setLink}/>
    </Screen>
  </>
}