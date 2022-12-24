import {Episode as Ep} from "./AllEpisodes";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Spinner} from "./Spinner";

export const Episode = () => {
  const {id} = useParams();
  const [episode, setEpisode] = useState(null);

  const getEpisode = async () => (await fetch(`https://rickandmortyapi.com/api/episode/${id}`)).json();

  useEffect(() => {
    getEpisode(id).then(setEpisode);
  }, [id]);

  return episode ? <Ep episode={episode} defaultOpen/> : <Spinner />;

}