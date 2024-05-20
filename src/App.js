import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import DarkMode from './components/DarkMode/DarkMode';
import { Navigation } from './components/navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/home';
import { Logout } from './components/logout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };


  return (

    <div className='container-fluid movie-app'>
      <div className='d-flex flex-row mt-4 mb-4'>
        <BrowserRouter>
          <Navigation></Navigation>
          <Routes>
            <Route
              path="/PWLab6/home"
              element={
                <ProtectedRoute>
                  <Home />
                  <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/PWLab6/login" element={<Login />} />
            <Route path="/PWLab6/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
        <DarkMode />

      </div>
      <div className='d-flex flex-wrap justify-content-start'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className='d-flex flex-wrap mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='d-flex flex-wrap justify-content-start'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;