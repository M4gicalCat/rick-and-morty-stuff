import {createSlice} from "@reduxjs/toolkit";

const getFavs = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('favorites'))
    ?.split('=')[1] ?? "";
  return [...new Set(cookieValue.split(",").filter(f => f.length).map(Number))];
};
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
      // localStorage.setItem("favorites", state.favoris.join(","));
      document.cookie = `favorites=${state.favoris.join(",")}; path=/;`;
    }
  }
});

export const {toggleFavori} = FavorisSlice.actions;

export default FavorisSlice.reducer;