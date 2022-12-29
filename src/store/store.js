import { configureStore } from '@reduxjs/toolkit';
import FavorisSlice from "./FavorisSlice";
import PersoSlice from "./PersoSlice";

export default configureStore({
  reducer: {
    favoris: FavorisSlice,
    personnages: PersoSlice,
  },
});