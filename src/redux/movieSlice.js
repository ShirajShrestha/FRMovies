import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovie: (state, actions) => {
      state.movies = actions.payload;
    },
  },
});

export const { fetchMovie } = movieSlice.actions;
export const setMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
