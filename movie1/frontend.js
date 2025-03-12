[13:59, 12/3/2025] Jimmi: import { useEffect, useState } from "react";
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
            <img src=…
[14:00, 12/3/2025] Jimmi: import { useState } from "react";
import { addMovie } from "../services/api";

const AddMovieForm = ({ onMovieAdded }) => {
  const [movieData, setMovieData] = useState({ title: "", author: "", date: "", image: null });
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

…
[14:00, 12/3/2025] Jimmi: import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;