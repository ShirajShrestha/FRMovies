import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailReducer from "./movieDetailSlice";
import reviewReducer from "./movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    movie: movieDetailReducer,
    reviews: reviewReducer,
  },
});

export default store;
