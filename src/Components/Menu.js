import {Link, Outlet} from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faMoon, faSun, faX} from "@fortawesome/free-solid-svg-icons";
import {useWindowSize} from "../hooks";
import {themes} from "../themes";

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

  & > * {
    padding: 1rem;
    text-decoration: none;
    text-align: center;
    color: white;
    border-bottom: 1px solid #63cbfb;
    width: 100%;
  }

  animation: fadeIn 0.25s ease-in-out;
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
            <Link onClick={() => setOpen(false)} to="/personnage">Personnages</Link>
            <Link onClick={() => setOpen(false)} to="/favoris">Favoris</Link>
          </List>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faBars} onClick={() => setOpen(true)}/>
        </>
      )}
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun}
                       onClick={() => setTheme(old => old === "light" ? 'dark' : 'light')}/>
    </SmallNav>
  );
}

const LargeMenu = ({theme, setTheme}) => (
  <Nav>
    <Link to="/">Home</Link>
    <Link to="/episode">Voir les épisodes</Link>
    <Link to="/personnage">Voir un personnage</Link>
    <Link to="/favoris">Voir mes favoris</Link>
    <FontAwesomeIcon style={{width: "1rem"}} icon={theme === "light" ? faMoon : faSun}
                     onClick={() => setTheme(old => old === "light" ? 'dark' : 'light')}/>
  </Nav>
);

const Background = styled.div`
  background-color: ${props => props.theme.background};
  margin: 0;
  padding: 0;
  min-height: 100vh;
  color: ${props => props.theme.color.text};
`;

export const Menu = () => {
  const width = useWindowSize();
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      {(width < 500) ? <PhoneMenu theme={theme} setTheme={setTheme}/> : <LargeMenu theme={theme} setTheme={setTheme}/>}
      <Background>
        <div style={{height: "2rem"}}/>
        <Outlet/>
      </Background>
    </ThemeProvider>
  );
}