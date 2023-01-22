import {createSlice} from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
  },
  reducers: {
    setId: (state, {payload: id}) => {
      state.id = id;
    },
  },
});

export const {setId} = AuthSlice.actions;

export default AuthSlice.reducer;