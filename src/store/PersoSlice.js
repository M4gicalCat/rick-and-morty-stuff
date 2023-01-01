import {createSlice} from "@reduxjs/toolkit";

export const PersoSlice = createSlice({
  name: 'personnages',
  initialState: [],
  reducers: {
    addPersonnages: (state, {payload: personnages}) => {
      const newState = state.filter(perso => !personnages.find(p => p.id === perso.id));
      state.splice(0);
      state.push(...newState, ...personnages);
    }
  }
});

export const {addPersonnages} = PersoSlice.actions;
export default PersoSlice.reducer;