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
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../firebase/init";
import {onValue, ref, set} from "firebase/database";
import {setFavoris} from "../store/FavorisSlice";
import {useDispatch, useSelector} from "react-redux";
import {setId} from "../store/AuthSlice";

export const Router = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const dispatch = useDispatch();
  const favoris = useSelector(state => state.favoris);
  const uid = useSelector(state => state.auth?.id);

  useEffect(() => {
    if (!uid) return;
    set(ref(db, `users/${uid}`), favoris).then();
  }, [favoris]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setId(user.uid));
        onValue(ref(db, `users/${user.uid}/favoris`), snapshot => {
          dispatch(setFavoris(snapshot.val() ?? []));
        });
      } else {
        dispatch(setId(null));
        dispatch(setFavoris(null));
      }
    });
  }, []);

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
          element: <Outlet />,
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
          element: <Outlet />,
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