import {useEffect, useState} from "react";
import {Title} from "./Title";
import {Spinner} from "./Spinner";
import {useSelector} from "react-redux";
import {addPersonnages, getPersonnages, SmallPersonnage} from "./Personnage";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(calc(100vw - 4rem), 400px);
  margin: 3rem auto 0 auto;
`;

const Card = styled.div`
  padding: 1rem;
  margin: 0 auto 1rem auto;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 5px;
  width: fit-content;
  > h1 {
    border-bottom: 1px solid ${({theme}) => theme.color.title};
    padding-bottom: 0.5rem;
  }
`;

export const Accueil = () => {
  const allFavs = useSelector(s => s.favoris.favoris);
  const [favoris, setFavoris] = useState([]);
  const [randoms, setRandoms] = useState([]);
  const [loading, setLoading] = useState({favoris: false, persos: false});

  const getRandomCharacters = async () => {
    setLoading(l => ({...l, persos: true}));
    const {info, results} = (await fetch('https://rickandmortyapi.com/api/character').then(r => r.json()));
    addPersonnages(results);
    const {count} = info;
    const randoms = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * count);
      randoms.push(random);
    }
    const persos = await getPersonnages(randoms);
    setRandoms(persos.filter(p => p));
    setLoading(l => ({...l, persos: false}));
  };

  useEffect(() => {
    getPersonnages(allFavs.slice(-5)).then(f => {
      setLoading(l => ({...l, favoris: false}));
      setFavoris(f);
      setLoading(l => ({...l, favoris: false}));
    });
  }, [allFavs]);

  useEffect(() => {
    getRandomCharacters().then();
  }, []);

  const RenderPersos = ({loading, persos, title}) => {
    if (loading) {
      return <Spinner />;
    }
    if (persos.length === 0) return null;
    return (
      <Card>
        <Title small>{title}</Title>
        <Container>
          {persos.map(perso => <SmallPersonnage key={perso.id} perso={perso}/>).reverse()}
        </Container>
      </Card>
    );
  };

  return (
    <>
      <Title>Accueil</Title>
      <RenderPersos loading={loading.persos} persos={randoms} title="Personnages aléatoires" />
      <RenderPersos loading={loading.favoris} persos={favoris} title="Mes derniers favoris" />
    </>
  );
};