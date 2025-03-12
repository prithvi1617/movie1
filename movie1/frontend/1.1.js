import { useEffect, useState } from "react";
import { getMovies } from "../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await getMovies(token);
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white p-4 shadow rounded">
            {/* Correcting the image source URL */}
            <img
              src={`http://localhost:5000/uploads/${movie.image}`}
              alt={movie.name} // Changed 'title' to 'name'
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-lg font-bold">{movie.name}</h3>{" "}
            {/* Changed 'title' to 'name' */}
            <p>Author: {movie.author}</p>
            <p>Date: {new Date(movie.releaseDate).toDateString()}</p>{" "}
            {/* Changed 'date' to 'releaseDate' */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
