import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: [],
  reviews: [],
};

const movieDetailSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMovieDetail: (state, actions) => {
      state.movie = actions.payload;
    },
    fetchReviews: (state, actions) => {
      state.reviews = actions.payload;
    },
  },
});

export default movieDetailSlice.reducer;
export const { fetchMovieDetail } = movieDetailSlice.actions;
export const { fetchReviews } = movieDetailSlice.actions;
export const setMovieDetail = (state) => state.movie.movie;
export const setReviews = (state) => state.reviews.reviews;
