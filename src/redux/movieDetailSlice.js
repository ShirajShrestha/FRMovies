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
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
});

export default movieDetailSlice.reducer;
export const { fetchMovieDetail, fetchReviews, addReview } =
  movieDetailSlice.actions;
export const setMovieDetail = (state) => state.movie.movie;
export const setReviews = (state) => state.reviews.reviews;
