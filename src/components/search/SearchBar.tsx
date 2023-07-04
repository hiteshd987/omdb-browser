import React, {useState, useEffect} from 'react';
import { Inter } from 'next/font/google';

import styles from './NavBar.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

type SearchProps = {
}

interface MovieData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Search: any;
    // ...
  }

const SearchBar: React.FC<SearchProps> = () => {
    const [movies, setMovies] = useState<MovieData[]>([]);

useEffect(() => {
    fetchData();
    console.log("Movies====>",movies);
},[]);

const fetchData = async () => {
  try {
    const response = await fetch('http://www.omdbapi.com/?s=love&apikey=d25cc249');
    const data: MovieData = await response.json();
    setMovies(data.Search);
    console.log(data);
    console.log(data.Search[1].Title);
  } catch (error) {
    console.log(error);
  }
};
return (
<>

    {movies.map((movie)=> (
    <div key={movie.Title}>
        <p>{movie?.Title}</p>
        <p>{movie?.Year}</p>
    </div>
 ))}

</>
)
}


    {/* <div key={movies[0]?.Runtime}>
        <p>{movies[0]?.Title}</p>
        <p>{movies[0]?.Year}</p>
    </div> */}
 {/* {movies.map((movie)=> {
    <div key={movie.Runtime}>
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
    </div>
 })} */}


// http://www.omdbapi.com/?apikey=[yourkey]&
// http://www.omdbapi.com/?i=tt3896198&apikey=d25cc249

export default SearchBar;
