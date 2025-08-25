import {
  getMovies,
  findMovies,
  findMoviesByGenre,
  addNewMovie,
  getMovieById,
  editMovie,
  deleteMovie,
} from "../models/movie.model.js";

export async function indexController(req, res) {
  let movies = await getMovies();
  res.render("index", { movies });
}

export async function searchController(req, res) {
  let query = req.query.term;
  let searchIn = req.query.in;

  if (!query) {
    return res.redirect("/");
  }

  let movies = await findMovies(query, searchIn);
  res.render("index", { movies });
}

export function addMovieGetController(req, res) {
  res.render("add");
}

export async function addMoviePostController(req, res) {
  await addNewMovie(req.body);
  res.redirect("/");
}

export async function searchByGenreController(req, res) {
  let genre = req.params.genre;
  let movies = await findMoviesByGenre(genre);
  res.render("index", { movies });
}

export async function editMovieGetController(req, res) {
  let movie = await getMovieById(req.params.id);
  res.render("edit", { movie });
}

export async function editMoviePostController(req, res) {
  await editMovie(req.params.id, req.body);
  res.redirect("/");
}

export async function deleteMovieController(req, res) {
  await deleteMovie(req.params.id);
  res.redirect("/");
}
