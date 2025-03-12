const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", upload.single("image"), updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
