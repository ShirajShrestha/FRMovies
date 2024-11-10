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
    fetchNextMovie: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
  },
});

export default movieSlice.reducer;
export const { fetchMovie, fetchNextMovie } = movieSlice.actions;
export const setMovies = (state) => state.movies.movies;
export const singleMovie = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === parseInt(movieId));
