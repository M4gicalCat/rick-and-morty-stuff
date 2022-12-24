import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import {Menu} from "./Menu";
import {AllEpisodes} from "./AllEpisodes";
import {Accueil} from "./Accueil";
import {Spinner} from "./Spinner";
import {Favorites} from "./Favorites";
import {Episode} from "./Episode";
import {AllPersonnages} from "./AllPersonnages";


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
          path: 'episode',
          element: <AllEpisodes/>,
        },
        {
          path: 'episode/:id',
          element: <Episode />,
        },
        {
          path: 'personnages',
          element: <AllPersonnages/>,
        },
        {
          path: 'personnages/:id',
          element: <Spinner/>,
        },
        {
          path: 'favoris',
          element: <Favorites/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}/>;
};