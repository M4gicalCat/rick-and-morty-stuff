import {createSlice} from "@reduxjs/toolkit";

export const FavorisSlice = createSlice({
  name: 'favoris',
  initialState: {
    favoris: null,
  },
  reducers: {
    toggleFavori: (state, {payload: id}) => {
      const index = state.favoris.findIndex((item) => item === id);
      if (index !== -1) {
        state.favoris.splice(index, 1);
      } else {
        state.favoris.push(id);
      }
    },
    setFavoris: (state, {payload: fromDb}) => {
      state.favoris = fromDb;
    },
  },
});

export const {toggleFavori, setFavoris} = FavorisSlice.actions;

export default FavorisSlice.reducer;