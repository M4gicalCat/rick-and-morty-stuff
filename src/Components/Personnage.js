import styled from "styled-components";
import {Link} from "react-router-dom";
import {ActionButton} from "./ActionButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {endPoint} from "../Model";
import {toggleFavori} from "../store/FavorisSlice";
import {useDispatch, useSelector} from "react-redux";

const favorites = new Set();
if (localStorage.getItem("favorites")) {
  for (const id of localStorage.getItem("favorites").split(",")) {
    favorites.add(+id);
  }
} else {
  localStorage.setItem("favorites", "");
}

const personnages = new Map();
export const getPersonnages = async (ids) => {
  const toFetch = [];
  for (const id of ids) {
    if (!personnages.has(id)) toFetch.push(id);
  }
  if (toFetch.length > 0) {
    const data = await (await fetch(`${endPoint}/character/[${toFetch.join(",")}]`)).json();
    for (const perso of data) {
      personnages.set(perso.id, perso);
    }
  }
  return ids.map(id => personnages.get(+id));
};

const CustomLink = styled(Link)`
  text-decoration: underline;
  color: ${({theme}) => theme.color.title};
  &:hover {
    color: ${({theme}) => theme.color.hover};
  }
  display: block;
`;

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
    <CustomLink style={{marginBottom: "1rem", color: perso.status === "Dead" ? "red" : undefined}} to={`/personnage/${perso.id}`}>
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
    <div>
      <CustomLink to={`/personnage/${perso.id}`} style={{color: perso.status === "Dead" ? "red" : undefined}}>{perso.name}</CustomLink>
      <p>{perso.species}{perso.type && ` - ${perso.type}`}</p>
    </div>
    <Heart perso={perso}/>
  </PersoContainer>
);

const Heart = ({perso}) => {
  const favoris = useSelector(s => s.favoris.favoris);
  const dispatch = useDispatch();
  const isFavorite = favoris.includes(perso.id);
  return (
    <ActionButton style={{position: "absolute", top: "1rem", right: "1rem"}}>
      <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartBroken} onClick={() => {
        dispatch(toggleFavori(perso.id));
      }} style={{ color: isFavorite  ? "red" : "grey", fontSize: "1.2rem" }}/>
    </ActionButton>
  );
}

export const isFavori = (id) => favorites.has(id);

export const getFavorites = () => [...favorites];