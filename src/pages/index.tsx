import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import SearchBar from '../components/search/SearchBar'

const inter = Inter({ subsets: ['latin'] })

export default function Search() {
  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with search page code */}
        {/* Edit file [src/pages/index.tsx] to update this page with search logic. */}
        <>
        <SearchBar />
        </>
      </main>
    </>
  )
}


// import { useState } from 'react';
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { Movie } from '../types/movie';
// import { getMovies } from '../utils/movie-api';
// import MovieList from '../components/MovieList';
// import Pagination from '../components/Pagination';

// interface Props {
  // movies: Movie[];
//   totalPages: number;
// }

// const Search = ({ movies, totalPages }: Props) => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     router.push(`/movies?page=${pageNumber}`);
//   };

//   return (
//     <div>
//       <MovieList movies={movies} />
//       <Pagination
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const page = query.page ? parseInt(query.page as string) : 1;
//   const { movies, totalPages } = await getMovies(page);

//   return {
//     props: {
//       movies,
//       totalPages,
//     },
//   };
// };
