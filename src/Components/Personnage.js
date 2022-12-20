import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ActionButton} from "./ActionButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";

const favorites = new Set();
if (localStorage.getItem("favorites")) {
  for (const id of localStorage.getItem("favorites").split(",")) {
    favorites.add(+id);
  }
} else {
  localStorage.setItem("favorites", "");
}

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
    {perso.type && <p>Type : {perso.type}</p>}
    <p>Espèce : {perso.species}</p>
    <Heart perso={perso}/>
  </CardContainer>
);

export const SmallPersonnage = ({perso, card}) => card ? (
  <Card perso={perso}/>
) :(
  <div style={{display: "flex", flexDirection: "row"}}>
    <img src={perso.image} alt={""} style={{width: "50px", height: "50px"}}/>
    <CustomLink to={`/personnage/${perso.id}`} style={{color: perso.status === "Dead" ? "red" : undefined}}>{perso.name}</CustomLink>
  </div>
);

const Heart = ({perso}) => {
  const [isFavorite, setIsFavorite] = React.useState(isFavori(perso.id));
  return (
    <ActionButton style={{position: "absolute", top: "1rem", right: "1rem"}}>
      <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartBroken} onClick={() => {
        toggleFavori(perso.id);
        setIsFavorite(f => !f);
      }} style={{ color: isFavorite  ? "red" : "grey", fontSize: "1.2rem" }}/>
    </ActionButton>
  );
}

export const isFavori = (id) => favorites.has(id);

export const toggleFavori = (id) => {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  localStorage.setItem("favorites", [...favorites].join(","));
}