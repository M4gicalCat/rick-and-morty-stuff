import {Episode as Ep} from "./AllEpisodes";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Spinner} from "./Spinner";


export const getEpisodes = async (ids) => (await fetch(`https://rickandmortyapi.com/api/episode/[${ids.join(",")}]`)).json();

export const Episode = () => {
  const {id} = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    getEpisodes([id]).then(setEpisode);
  }, [id]);

  return episode ? <Ep episode={episode} defaultOpen/> : <Spinner />;
}