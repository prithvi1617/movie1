import { useState } from "react";
import { addMovie } from "../services/api";

const AddMovieForm = ({ onMovieAdded }) => {
  const [movieData, setMovieData] = useState({
    title: "",
    author: "",
    date: "",
    image: null,
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setMovieData({ ...movieData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie(movieData, token);
      onMovieAdded();
      setMovieData({ title: "", author: "", date: "", image: null });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={movieData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={movieData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
