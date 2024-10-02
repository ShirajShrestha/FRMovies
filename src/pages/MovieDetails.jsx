import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMovieDetail,
  fetchReviews,
  setMovieDetail,
  setReviews,
} from "../redux/movieDetailSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector(setMovieDetail);
  const reviews = useSelector(setReviews);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchMovieDetail(data));
      });
  }, [dispatch, id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchReviews(data.results));
      });
  }, [dispatch, id]);

  const handleSubmit = useCallback(async () => {
    const value = document.getElementById("Rating").value;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        // body: '{"value":8.5}',
        body: `{"value": ${value}}`,
      }
    );
    const data = await response.json();
    console.log(data);
  }, [id]);

  const getAvatar = (authorDetails) => {
    if (authorDetails.avatar_path) {
      // Some avatar paths may start with '/https', so we need to handle that
      if (authorDetails.avatar_path.startsWith("/https")) {
        return authorDetails.avatar_path.substring(1); // Remove the leading '/'
      }
      return `https://image.tmdb.org/t/p/w45${authorDetails.avatar_path}`;
    }
    // Default placeholder avatar
    return "https://via.placeholder.com/45";
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {/* Movie Backdrop and Poster Section */}
        <div className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Backdrop Image with Blur */}
          <div className="relative min-h-[30rem] sm:min-h-[35rem] lg:min-h-[40rem]">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-full h-full object-cover filter blur-lg"
            />

            {/* Poster Image */}
            <div className="absolute top-1/2 left-1/2 sm:left-8 transform -translate-y-1/2 -translate-x-1/2 sm:translate-x-0">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.original_title}
                className="w-40 sm:w-48 rounded-lg shadow-lg"
              />
            </div>

            <div className="absolute top-3/4 left-1/2 sm:left-64 transform -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 text-white p-4 text-center sm:text-left">
              <h3 className="text-xl sm:text-3xl font-bold mb-4">
                {movie.original_title}
              </h3>
              <p className="text-md sm:text-lg mb-4 text-gray-300">
                Rating: {Math.round(movie.vote_average * 10) / 10}
              </p>

              <a
                href={`https://www.youtube.com/results?search_query=${movie.original_title}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          <p className="mb-4">{movie.overview}</p>

          <div className="block">
            <p className="text-gray-400">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="text-gray-400">
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p className="text-gray-400">
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>

        {/* Rating the movie */}
        <div className="mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-md flex justify-between ">
          <div className="flex gap-4">
            <h3 className="text-xl font-semibold mb-2">Rate this movie:</h3>
            <select
              name="ratings"
              id="Rating"
              className="text-black px-2 rounded-lg"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <button
            className="bg-yellow-500 p-2 rounded text-black"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* reviews */}
        {/* <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                  <p className="text-sm text-gray-400">
                    <strong>{review.author}</strong> —{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-300">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No reviews available.</p>
          )}
        </div> */}
        <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <img
                      src={getAvatar(review.author_details)}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-grow">
                      {/* Author and Review Metadata */}
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-400">
                          <strong>{review.author}</strong> —{" "}
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                        {/* User Rating (if available) */}
                        {review.author_details.rating && (
                          <span className="bg-yellow-500 text-black text-xs font-bold py-1 px-2 rounded">
                            {review.author_details.rating}/10
                          </span>
                        )}
                      </div>

                      {/* Review Content */}
                      <p className="mt-2 text-gray-300">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
