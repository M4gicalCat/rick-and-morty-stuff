import {useEffect, useState} from "react";
import {Title} from "./Title";
import {Spinner} from "./Spinner";
import {useDispatch, useSelector} from "react-redux";
import {SmallPersonnage} from "./Personnage";
import {addPersonnages} from "../store/PersoSlice";
import {usePersonnages, useWindowSize} from "../hooks";
import {MortyEyes} from "./MortyEyes";
import {RickEyes} from "./RickEyes";
import {Container} from "./Container";
import {Card} from "./Card";


export const Accueil = () => {
  const {getPersonnages} = usePersonnages();
  const allFavs = useSelector(s => s.favoris.favoris);
  const [favoris, setFavoris] = useState([]);
  const [randoms, setRandoms] = useState([]);
  const [loading, setLoading] = useState({favoris: false, persos: false});
  const dispatch = useDispatch();
  const width = useWindowSize();

  const getRandomCharacters = async () => {
    setLoading(l => ({...l, persos: true}));
    const {info, results} = (await fetch('https://rickandmortyapi.com/api/character').then(r => r.json()));
    dispatch(addPersonnages(results));
    const {count} = info;
    const randoms = [];
    for (let i = 0; i < 5; i++) {
      randoms.push(Math.floor(Math.random() * count));
    }
    const persos = await getPersonnages(randoms);
    setRandoms(persos.filter(p => p));
    setLoading(l => ({...l, persos: false}));
  };

  useEffect(() => {
    if (!allFavs) return;
    getPersonnages(allFavs.slice(-5)).then(f => {
      setLoading(l => ({...l, favoris: false}));
      setFavoris(f);
      setLoading(l => ({...l, favoris: false}));
    });
  }, [allFavs]);

  useEffect(() => {
    getRandomCharacters().then();
  }, []);

  const RenderPersos = ({loading, persos, title, prefix}) => {
    if (loading) {
      return (
        <Card>
          <Title small>{title}</Title>
          <Spinner/>
        </Card>
      );
    }
    if (persos.length === 0) return null;
    return (
      <Card>
        <Title small>{title}</Title>
        <Container>
          {persos.map(perso => <SmallPersonnage key={`${prefix}_${perso.id}`} perso={perso}/>).reverse()}
        </Container>
      </Card>
    );
  };

  return (
    <div style={{position: "relative", width: "100%", height: "max-content"}}>
      <MortyEyes />
      <RickEyes />
      <Title>Accueil</Title>
      <div style={{display: "flex", flexDirection: width >= 1000 ? "row" : "column"}}>
        <RenderPersos loading={loading.persos} prefix="random" persos={randoms} title="Personnages aléatoires" />
        <RenderPersos loading={loading.favoris || allFavs === null} prefix="favori" persos={favoris} title="Mes derniers favoris" />
      </div>
    </div>
  );
};