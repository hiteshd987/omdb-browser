// import Head from 'next/head'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Recommend.module.css'

// const inter = Inter({ subsets: ['latin'] })

// export default function Recommend() {
//   return (
//     <>
//       <Head>
//         <title>OMDB Browser - Recommendations</title>
//         <meta name="description" content="Get movie recommendations." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={`${styles.main} ${inter.className}`}>
//         {/* update with recommendations page code */}
//         Edit file [src/pages/recommend.tsx] to update this page with recommendations logic.
//       </main>
//     </>
//   )
// }

import { useState, useEffect } from 'react';
import { Card } from 'antd';

interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  imdbID: string;
  Poster: any;
  Search: any;
  // ...
}

function RandomMovies() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const fetchRandomMovies = async () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const response = await fetch(`http://www.omdbapi.com/?s=random&apikey=d25cc249&y=${dateString}`);
    const data = await response.json();
    const randomIndexes = Array.from({ length: 5 }, () => Math.floor(Math.random() * data.Search.length));
    const randomMovies = randomIndexes.map((index) => data.Search[index]);
    const movieResponses = await Promise.all(randomMovies.map((movie) => fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=d25cc249`)));
    const movieData = await Promise.all(movieResponses.map((response) => response.json()));
    setMovies(movieData);
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  return (
    <div>
      <h1>Random Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <Card hoverable style={{ width: 240, margin: '16px' }} cover={<img alt={movie.Title} src={movie.Poster} />}>
            <Card.Meta title={movie.Title} description={movie.Year} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RandomMovies;