import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faMoon, faSun, faX} from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../hooks";
import {Connected} from "./Connected";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: #282c34;
  color: white;
  height: max-content;
  z-index: 9999;
  & > * {
    padding: 1rem;
    text-decoration: none;
    color: white;

    &:hover {
      color: ${({theme}) => theme.color.hover};
    }

    transition-duration: .25s;
  }
`;

export const SmallNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: #282c34;
  color: white;
  height: max-content;
  z-index: 9999;
  & > * {
    padding: 1rem;
    text-decoration: none;
    color: white;

    &:hover {
      color: ${({theme}) => theme.color.hover};
    }
  }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease-in-out;

  & > * {
    padding: 1rem;
    text-decoration: none;
    text-align: center;
    color: white;
    border-bottom: 1px solid #63cbfb;
    width: 100%;
  }
`;

const PhoneMenu = ({theme, setTheme}) => {
  const [open, setOpen] = useState(false);

  return (
    <SmallNav>
      {open ? (
        <>
          <FontAwesomeIcon icon={faX} onClick={() => setOpen(false)}/>
          <List>
            <Link onClick={() => setOpen(false)} to="/">Accueil</Link>
            <Link onClick={() => setOpen(false)} to="/episode">Episodes</Link>
            <Link onClick={() => setOpen(false)} to="/personnages">Personnages</Link>
            <Connected Component={
              <>
                <Link onClick={() => setOpen(false)} to="/favoris">Favoris</Link>
                <Link onClick={() => setOpen(false)} to="/account">Mon compte</Link>
              </>
            } hidden />
            <Connected reverse Component={<Link to='/auth/login' onClick={() => setOpen(false)}>Se connecter</Link>} />
          </List>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faBars} onClick={() => setOpen(true)}/>
        </>
      )}
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        onClick={() => setTheme(old => old === "light" ? 'dark' : 'light')}
      />
    </SmallNav>
  );
}

const LargeMenu = ({theme, setTheme}) => (
  <Nav>
    <Link to="/">Accueil</Link>
    <Link to="/episode">Voir les ??pisodes</Link>
    <Link to="/personnages">Voir les personnages</Link>
    <Connected
      Component={
        <>
          <Link to="/favoris">Voir mes favoris</Link>
          <Link to="/account">Mon compte</Link>
        </>
      }
      hidden
    />
    <Connected reverse Component={<Link to='/auth/login'>Se connecter</Link>} />
    <FontAwesomeIcon
      style={{width: "1rem"}}
      icon={theme === "light" ? faMoon : faSun}
      onClick={() => setTheme(old => old === "light" ? 'dark' : 'light')}
    />
  </Nav>
);

const Background = styled.div`
  background-color: ${props => props.theme.background};
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  color: ${props => props.theme.color.text};
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.color.scrollbar.thumb};
    height: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.color.scrollbar.hover};
  }
`;

export const Menu = ({theme, setTheme}) => {
  const width = useWindowSize();
  return (
    <>
      {(width < 500) ? <PhoneMenu theme={theme} setTheme={setTheme}/> : <LargeMenu theme={theme} setTheme={setTheme}/>}
      <Background>
        <div style={{height: "5rem"}}/>
        <Outlet/>
      </Background>
    </>
  );
};