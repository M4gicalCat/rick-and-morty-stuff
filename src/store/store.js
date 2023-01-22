import { configureStore } from '@reduxjs/toolkit';
import FavorisSlice from "./FavorisSlice";
import PersoSlice from "./PersoSlice";
import AuthSlice from "./AuthSlice";

export default configureStore({
  reducer: {
    favoris: FavorisSlice,
    personnages: PersoSlice,
    auth: AuthSlice,
  },
});