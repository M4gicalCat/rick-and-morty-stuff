import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import {ActionButton} from "./ActionButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {toggleFavori} from "../store/FavorisSlice";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "./Spinner";
import {useEffect, useState} from "react";
import {Title} from "./Title";
import {getEpisodes} from "./Episode";
import {usePersonnages} from "../hooks";
import {CustomLink} from "./CustomLink";
import {Connected} from "./Connected";

const CardContainer = styled.div`
  height: calc(100% - 2rem);
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.color.card.background};
  position: relative;
  transition-duration: .18s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px 0 ${({theme}) => theme.color.card.shadow};
  }
  >img {
    max-width: 80%;
    max-height: 150px;
    margin: 0 auto;
    transition-duration: .25s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Card = ({perso}) => (
  <CardContainer>
    <CustomLink style={{margin: "0 1.5rem 1rem 0", color: perso.status === "Dead" ? "red" : undefined}} to={`/personnages/${perso.id}`}>
      {perso.name}
    </CustomLink>
    <img src={perso.image} alt={""}/>
    <p>Sexe : {perso.gender}</p>
    <p>Espèce : {perso.species}</p>
    {perso.type && <p>Type : {perso.type}</p>}
    <Heart perso={perso}/>
  </CardContainer>
);

const PersoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 1rem;
  > img {
    border-radius: 3px;
  }
  > div {
    margin-left: 1rem;
    > p {
      color: ${({theme}) => theme.color.dark};
      font-size: .8rem;
    }
  }
`;

export const SmallPersonnage = ({perso, card}) => card ? (
  <Card perso={perso}/>
) : (
  <PersoContainer>
    <img src={perso.image} alt={""} style={{width: "50px", height: "50px"}}/>
    <div style={{marginRight: "2rem"}}>
      <CustomLink to={`/personnages/${perso.id}`} style={{color: perso.status === "Dead" ? "red" : undefined}}>{perso.name}</CustomLink>
      <p>{perso.species}{perso.type && ` - ${perso.type}`}</p>
    </div>
    <Heart perso={perso}/>
  </PersoContainer>
);

const Heart = ({perso, big, style}) => {
  const favoris = useSelector(s => s.favoris.favoris);
  const dispatch = useDispatch();
  if (favoris === null) return null;
  const isFavorite = favoris.includes(perso.id);
  return (
    <Connected
      Component={
        <>
          <ActionButton className={isFavorite ? "beating" : undefined} style={{position: "absolute", top: "1rem", right: "1rem", ...style}}>
            <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartBroken} onClick={() => {
              dispatch(toggleFavori(perso.id));
            }} style={{ color: isFavorite  ? "red" : "grey", fontSize: big ? "2rem" : "1.2rem" }}/>
          </ActionButton>
        </>
      }
      hidden
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  > .grid {
    @media (min-width: 700px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const Outline = styled.div`
  padding: 1rem 1.7rem;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 12px;
  margin: 1rem;
  text-align: center;
  > h1{
    margin: 0;
    padding: 1rem 1rem 1.5rem 1rem;
    border-bottom: 1px solid ${({theme}) => theme.color.title};
  }
  >p {
    margin: 0;
    padding: 0;
  }
`;

const SousTitre = styled.p`
  color: ${({theme}) => theme.color.title};
  font-size: 1.2rem;
  padding: 1rem 0 .5rem 0 !important;
`;

export const Personnage = () => {
  const {getPersonnages} = usePersonnages();
  const {id} = useParams();
  const [perso, setPerso] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const load = async () => {
    const [p] = await getPersonnages([id]);
    setPerso(p);
    setEpisodes(await getEpisodes(p.episode.map(e => +e.split("/").pop())));
  };

  useEffect(() => {
    setLoading(true);
    load().then(() => setLoading(false));
  }, [id]);
  return (
    <>
      {loading && <Spinner/>}
      {perso &&  (
        <Container>
          <Link to={`/personnages/${perso.id}`}><Title underline>{perso.name}</Title></Link>
          <div style={{position: "relative"}}>
            <img src={perso.image} alt={""} style={{maxWidth: "min(90vw, 200px)", height: "auto" }}/>
            <Heart perso={perso} big style={{top: ".5rem", right: '.5rem'}}/>
          </div>
          <div className="grid">
            <Outline>
              <Title small>Informations personnelles</Title>
              <SousTitre>Sexe</SousTitre>
              <p>{perso.gender}</p>
              <SousTitre>Espèce</SousTitre>
              <p>{perso.species}</p>
              {perso.type && (
                <>
                  <SousTitre>Type</SousTitre>
                  <p>{perso.type}</p>
                </>
              )}
              <SousTitre>Statut</SousTitre>
              <p>{perso.status}</p>
            </Outline>
            <Outline>
              <Title small>Position</Title>
              <SousTitre>Origine</SousTitre>
              <p>{perso.origin.name}</p>
              <SousTitre>Actuelle</SousTitre>
              <p>{perso.location.name}</p>
            </Outline>
            {episodes?.length > 0 && (
              <Outline style={{gridColumn: "span 2"}} >
                <Title style={{marginBottom: "1.2rem"}} small>Apparitions</Title>
                <div style={{display: "flex", flexDirection: "column"}}>
                  {episodes.map((e) => (
                    <CustomLink style={{marginBottom: ".5rem"}} to={`/episode/${e.id}`} key={e.id}>{e.episode} - {e.name} ({e.air_date})</CustomLink>
                  ))}
                </div>
              </Outline>
            )}
          </div>
        </Container>
      )}
    </>
  );
};