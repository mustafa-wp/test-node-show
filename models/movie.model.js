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


const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

export let getMovies = async function () {
  return await Movie.find().sort({ year: -1 }).limit(20);
};

export let findMovies = async function (query, searchIn) {
  if (searchIn === "title") {
    return await Movie.find({ title: { $regex: query, $options: "i" } });
  } else if (searchIn === "cast") {
    return await Movie.find({ cast: { $regex: query, $options: "i" } });
  }
  return []; // default لو searchIn مش متعرف
};

export let findMoviesByGenre = async function (genre) {
  return await Movie.find({ genres: { $regex: genre, $options: "i" } })
    .sort({ year: -1 })
    .limit(20);
};

export let addNewMovie = async function (data) {
  let { title, year, genre = "", cast = "", thumbnail } = data;
  let genres = genre ? genre.split(",").map((g) => g.trim()) : [];
  let castArray = cast ? cast.split(",").map((c) => c.trim()) : [];

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
  return await Movie.findById(id);
};

export let editMovie = async function (id, data) {
  let { title, year, genre = "", cast = "", thumbnail } = data;
  let genres = genre ? genre.split(",").map((g) => g.trim()) : [];
  let castArray = cast ? cast.split(",").map((c) => c.trim()) : [];

  await Movie.findByIdAndUpdate(
    id,
    { title, year, genres, cast: castArray, thumbnail },
    { new: true }
  );
};

export let deleteMovie = async function (id) {
  await Movie.findByIdAndDelete(id);
};
