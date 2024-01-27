import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Press Enter to Search
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  const searchMovies = async (title) => {
    try {
      // Set loading to true before making the API call
      setLoading(true);

      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      // Set movies and turn off loading when API call is successful
      setMovies(data.Search);
    } catch (error) {
      // Handle errors if the API call fails
      console.error("Error fetching data:", error);
    } finally {
      // Delay the turning off of loading by .1 seconds
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyPress={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
