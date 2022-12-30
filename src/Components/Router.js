import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import {Menu} from "./Menu";
import {AllEpisodes} from "./AllEpisodes";
import {Accueil} from "./Accueil";
import {Favorites} from "./Favorites";
import {Episode} from "./Episode";
import {AllPersonnages} from "./AllPersonnages";
import {Personnage} from "./Personnage";
import {Error} from "./Error";
import {themes} from "../themes";
import {ThemeProvider} from "styled-components";

export const Router = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu theme={theme} setTheme={setTheme} />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Accueil />,
        },
        {
          path: 'episode',
          element: <AllEpisodes />,
        },
        {
          path: 'episode/:id',
          element: <Episode />,
        },
        {
          path: 'personnages',
          element: <AllPersonnages />,
        },
        {
          path: 'personnages/:id',
          element: <Personnage />,
        },
        {
          path: 'favoris',
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <RouterProvider router={router} />
    </ThemeProvider>);
};