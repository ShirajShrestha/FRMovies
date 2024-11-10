import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovie, fetchNextMovie, setMovies } from "../redux/movieSlice";

const Movielist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector(setMovies);
  const [value, setValue] = useState("now_playing");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const showMovieDetails = (id) => {
    navigate(`/movies/${id}`);
  };

  const handlechange = (e) => {
    setValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsFetching(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${value}?language=en-US&page=${currentPage}&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (currentPage === 1) {
          dispatch(fetchMovie(data.results));
        } else {
          console.log(data.results);
          dispatch(fetchNextMovie(data.results));
        }
        setIsFetching(false);
      });
  }, [dispatch, value, currentPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100 && !isFetching) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Our Movies</h2>
        <select
          name=""
          onChange={handlechange}
          className="border border-black rounded-lg px-4 cursor-pointer"
        >
          <option value="now_playing">Now Playing</option>
          <option value="popular">Popular</option>
          <option value="top_rated">Top Rating</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:bg-gray-700 cursor-pointer"
              onClick={() => showMovieDetails(movie.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  {movie.original_title}
                </h3>
                <p className="text-sm text-gray-300">
                  Rating: {Math.round(movie.vote_average * 10) / 10}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movielist;
