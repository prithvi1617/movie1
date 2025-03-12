const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createMovie);
router.get("/", authMiddleware, getMovies);
router.get("/:id", authMiddleware, getMovieById);
router.put("/:id", authMiddleware, upload.single("image"), updateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router;
