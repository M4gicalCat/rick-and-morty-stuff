import {endPoint} from "../Model";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Button} from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronDown, faChevronUp, faX} from "@fortawesome/free-solid-svg-icons";
import {Title} from "./Title";
import {Link} from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const List = ({episodes}) => {
  const personnages = useRef(new Map());
  const getPersonnages = async (ids) => {
    const toFetch = [];
    for (const id of ids) {
      if (!personnages.current.has(id)) toFetch.push(id);
    }
    if (toFetch.length > 0) {
      const data = await (await fetch(`${endPoint}/character/[${toFetch.join(",")}]`)).json();
      for (const perso of data) {
        console.log(perso);
        personnages.current.set(perso.id, perso);
      }
    }
    return ids.map(id => personnages.current.get(+id));
  };

  return (
    <ListContainer>
      {episodes.map(episode => <Episode key={episode.id} personnages={personnages} getPersonnages={getPersonnages}
                                        episode={episode}/>)}
    </ListContainer>
  );
};

const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.color.title};

  &:hover {
    color: ${({theme}) => theme.color.hover};
  }

  display: block;
`;

const Card = styled.div`
  ${({open, theme}) => {
    if (!open) return "";
    return `
            border: 1px solid ${theme.color.border};
            border-radius: 5px;
            padding: 1rem;
        `;
  }}
`;

const Episode = ({episode, getPersonnages}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card open={open}>
      <Title onClick={() => setOpen(o => !o)} style={{cursor: "pointer"}} small
             align="left">{episode.episode} - {episode.name} <FontAwesomeIcon style={{float: "right"}}
                                                                              icon={open ? faChevronUp : faChevronDown}/></Title>
      {open && (
        <div style={{marginLeft: "2rem"}}>
          <p>Sorti le {episode.air_date}</p>
          <p>{episode.characters.length} personnages :</p>
          <Personnages getPersonnages={getPersonnages} urls={episode.characters}/>
        </div>
      )}
    </Card>
  );
};

const Personnages = ({urls, getPersonnages}) => {
  const [personnages, setPersonnages] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    getPersonnages(urls.map(u => u.split("/").pop())).then(persos => {
      setPersonnages(persos);
      console.log(persos);
    });
  }, [open, urls]);

  useEffect(() => console.log(personnages), [personnages]);

  return (
    <div>
      <Button onClick={() => setOpen(o => !o)}>{open ? "Fermer" : "Ouvrir"}</Button>
      {open && (
        <div>
          {personnages.map(perso => <Perso perso={perso} key={perso.id}/>)}
        </div>
      )}
    </div>
  );
};

const Perso = ({perso}) => (
  <div style={{display: "flex", flexDirection: "row"}}>
    <PersoImage perso={perso}/>
    <CustomLink to={`/personnage/${perso.id}`}>{perso.name}</CustomLink>
  </div>
);

const PersoImage = ({perso}) => (
  <div style={{position: "relative"}}>
    <img src={perso.image} alt={""} style={{width: "50px", height: "50px",}}/>
    {perso.status === "Dead" && <FontAwesomeIcon icon={faX} style={{
      width: "50px",
      height: "45px",
      position: "absolute",
      top: "0",
      left: "0",
      color: "red"
    }}/>}
  </div>
)

const Screen = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const Infos = ({infos, setLink}) => (
  <InfoContainer>
    <Button onClick={() => setLink(infos.prev)}>
      <FontAwesomeIcon icon={faArrowLeft}/>
    </Button>
    <Button onClick={() => setLink(infos.next)}>
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
      <Title>Tous les épisodes</Title>
      <List episodes={episodes}/>
      <Infos infos={info} setLink={setLink}/>
    </Screen>
  </>
}