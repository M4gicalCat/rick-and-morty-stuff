import {createSlice} from "@reduxjs/toolkit";

const getFavs = () => {
  const str = localStorage.getItem("favorites");
  if (str?.length) {
    return [...new Set(str.split(",").map(Number))];
  }
  return [];
}
export const FavorisSlice = createSlice({
  name: 'favoris',
  initialState: {
    favoris: getFavs(),
  },
  reducers: {
    toggleFavori: (state, {payload: id}) => {
      const index = state.favoris.findIndex((item) => item === id);
      if (index !== -1) {
        state.favoris.splice(index, 1);
      } else {
        state.favoris.push(id);
      }
      localStorage.setItem("favorites", state.favoris.join(","));
    }
  }
});

export const {toggleFavori} = FavorisSlice.actions;

export default FavorisSlice.reducer