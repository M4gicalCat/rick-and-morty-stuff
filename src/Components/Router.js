import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import {Menu} from "./Menu";
import {AllEpisodes} from "./AllEpisodes";
import {Accueil} from "./Accueil";
import {Spinner} from "./Spinner";
import {Favorites} from "./Favorites";


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
          path: '/personnages',
          element: <Spinner/>,
        },
        {
          path: '/favoris',
          element: <Favorites/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}/>;
};