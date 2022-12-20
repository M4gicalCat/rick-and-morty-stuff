import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import {Menu} from "./Menu";
import {AllEpisodes} from "./AllEpisodes";
import {Accueil} from "./Accueil";


export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu/>,
      children: [
        {
          path: '/',
          element: <Accueil/>,
        },
        {
          path: '/episode',
          element: <AllEpisodes/>,
        },
        {
          path: '/personnage',
          element: <>Persos</>,
        },
        {
          path: '/favoris',
          element: <>Favs</>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}/>;
};