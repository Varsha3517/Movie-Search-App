let api;
let movieName;
let movieDetails = {};
let searchedMovies = [];

searchMovie = () => {
  movieName = document.getElementById("movieInput");
  fetchMovie(movieName.value);
  if (movieName.value !== "") {
    searchedMovies.push(movieName.value);
    recentSearched();
  }
  movieName.value = "";
};

fetchMovie = (movieName) => {
  api = `https://www.omdbapi.com/?apikey=61e576a4&t=${movieName}`;

  fetch(api)
    .then((data) => data.json())
    .then((data) => {
      if (data.Response == "False") {
        document.getElementById("details").style.display = "none";
        document.getElementById("error").style.display = "block";
      } else {
        document.getElementById("recent-list").innerText = searchedMovies;
        console.log("Searched Movies --> ", searchedMovies);

        document.getElementById("details").style.display = "block";
        document.getElementById("error").style.display = "none";

        movieDetails.title = data.Title;
        movieDetails.year = data.Year;
        movieDetails.rating = data.imdbRating;
        movieDetails.released = data.Released;
        movieDetails.poster = data.Poster;
        movieDetails.plot = data.Plot;
        console.log("Movie Details --> ", movieDetails);

        displayMovie();
      }
    });
};

displayMovie = () => {
  document.getElementById("poster").src = movieDetails.poster;
  document.getElementById("title").innerText = movieDetails.title;
  document.getElementById("year").innerText = "(" + movieDetails.year + ")";
  document.getElementById("released").innerText =
    "Release Date: " + movieDetails.released;
  document.getElementById("imdb").innerText =
    "IMDB: " + movieDetails.rating + " ⭐";
  document.getElementById("desc").innerText = movieDetails.plot;
};

recentSearched = () => {
  if (searchedMovies.length !== 0) {
    document.getElementById("recent").style.display = "block";
  } else {
    document.getElementById("recent").style.display = "none";
  }
};

removeLatest = () => {
  searchedMovies.pop();
  recentSearched();
  document.getElementById("recent-list").innerText = searchedMovies;
  console.log("Searched Movies --> ", searchedMovies);
  fetchMovie(searchedMovies[searchedMovies.length - 1]);

  movieName.value = "";
};
