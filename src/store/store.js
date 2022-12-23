import { configureStore } from '@reduxjs/toolkit';
import FavorisSlice from "./FavorisSlice";

export default configureStore({
  reducer: {
    favoris: FavorisSlice,
  },
});