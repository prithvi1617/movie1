const Movie = require("../models/Movie");

// 🔹 Create Movie
exports.createMovie = async (req, res) => {
  try {
    const { name, author, releaseDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) return res.status(400).json({ msg: "Image is required" });

    const movie = new Movie({ name, author, releaseDate, image });
    await movie.save();

    res.status(201).json({ msg: "Movie added", movie });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Get All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Get Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Update Movie
exports.updateMovie = async (req, res) => {
  try {
    const { name, author, releaseDate } = req.body;
    const updateData = { name, author, releaseDate };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.json({ msg: "Movie updated", movie });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 Delete Movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    res.json({ msg: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
