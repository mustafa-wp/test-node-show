import express from "express";

import {
    indexController,
    searchController,
    addMovieGetController,
    addMoviePostController,
    searchByGenreController,
    editMovieGetController,
    editMoviePostController,
    deleteMovieController,
} from "./controllers/movie.controller.js";

export const router = express.Router();

router.get("/", indexController);
router.get("/search", searchController);
router.get("/add", addMovieGetController);
router.post("/add", addMoviePostController);
router.get("/:genre", searchByGenreController);
router.get("/edit/:id", editMovieGetController);
router.post("/edit/:id", editMoviePostController);
router.post("/delete/:id", deleteMovieController);