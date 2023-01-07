import React, {useEffect, useState} from 'react';
import {createBrowserRouter, Outlet, RouterProvider,} from 'react-router-dom';
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
import {Register} from "./Register";
import {Connected} from "./Connected";
import {Account} from "./Account";

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
          element: <Connected Component={<Accueil />} />,
        },
        {
          path: 'episode',
          element: <Connected Component={<Outlet />} />,
          children: [
            {
              path: ':id',
              element: <Episode />,
            },
            {
              path: "",
              element: <AllEpisodes/>,
            }
          ]
        },
        {
          path: 'personnages',
          element: <Connected Component={<Outlet />} />,
          children: [
            {
              path: ':id',
              element: <Personnage />,
            },
            {
              path: "",
              element: <AllPersonnages/>,
            }
          ],
        },
        {
          path: 'favoris',
          element: <Connected Component={<Favorites />} />,
        },
        {
          path: 'account',
          element: <Connected Component={<Account />} />,
        },
        {
          path: "auth",
          element: <Outlet />,
          children: [
            {
              path: "login",
              element: <Register />,
            },
            {
              path: "",
              element: <Register newUser/>,
            },
          ],
        }
      ],
    },
  ]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <RouterProvider router={router} />
    </ThemeProvider>);
};