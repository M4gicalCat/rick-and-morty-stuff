import {Title} from "./Title";
import {useEffect,  useState} from "react";
import {getFavorites, getPersonnages, SmallPersonnage, refreshFavs} from "./Personnage";

export const Favorites = () => {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    getPersonnages(getFavorites()).then(setFavoris);
  }, [refreshFavs]);

  return (
    <>
      <Title>Mes personnages favoris</Title>
      <div style={{display: "flex", flexDirection: "row"}}>
        {favoris.map(favori => <SmallPersonnage card perso={favori} />)}
      </div>
    </>
  );
}