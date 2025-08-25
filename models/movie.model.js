import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  cast: { type: [String], required: true },
  genres: { type: [String], required: true },
  extract: { type: String, required: false },
  thumbnail: { type: String, required: false },
  thumbnail_width: { type: Number, required: false },
  thumbnail_height: { type: Number, required: false },
});

export let getMovies = async function () {
  let movies = await Movie.find().sort({ year: -1 }).limit(20);
  return movies;
};

export let findMovies = async function (query, searchIn) {
  if (searchIn === "title") {
    let movies = await Movie.find({ title: { $regex: query, $options: "i" } });
    return movies;
  } else if (searchIn === "cast") {
    let movies = await Movie.find({ cast: { $regex: query, $options: "i" } });
    return movies;
  }
};

export let findMoviesByGenre = async function (genre) {
  let movies = await Movie.find({ genres: { $regex: genre, $options: "i" } })
    .sort({ year: -1 })
    .limit(20);
  return movies;
};

export let addNewMovie = async function (data) {
  let { title, year, genre, cast, thumbnail } = data;
  let genres = genre.split(",").map((g) => g.trim());
  let castArray = cast.split(",").map((c) => c.trim());
  let movie = new Movie({
    title,
    year,
    genres,
    cast: castArray,
    thumbnail,
  });
  await movie.save();
};

export let getMovieById = async function (id) {
  let movie = await Movie.findById(id);
  return movie;
};

export let editMovie = async function (id,data) {
  let { title, year, genre, cast, thumbnail } = data;
  let genres = genre.split(",").map((g) => g.trim());
  let castArray = cast.split(",").map((c) => c.trim());
  await Movie.findByIdAndUpdate(id, {
    title,
    year,
    genres,
    cast: castArray,
    thumbnail,
  });
};

export let deleteMovie = async function (id) {
  await Movie.findByIdAndDelete(id);
};

export const Movie = mongoose.model("Movie", movieSchema);
