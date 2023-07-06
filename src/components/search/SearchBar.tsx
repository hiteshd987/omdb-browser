import React, {useState, useEffect, useRef} from 'react';
import { Inter } from 'next/font/google';
import styles from './NavBar.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input, Col, Divider, Row, Card } from 'antd';
import Image from 'next/image';
import Pagination from '../pagination/Pagination';

const inter = Inter({ subsets: ['latin'] })
const { Search } = Input;


type SearchProps = {
}

interface MovieData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    imdbID: string;
    Poster: string;
    Search: any;
    // ...
  }

const SearchBar: React.FC<SearchProps> = () => {
    const router = useRouter();
const { showSearch } = router.query;
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchData = async () => {
          try {
            const response = await fetch(`http://www.omdbapi.com/?s=marvel&apikey=d25cc249`);
            const data = await response.json();
            setMovies(data.Search);
            setTotalResults(parseInt(data.totalResults));
            console.log("Fetch Data", data);
          } catch (error) {
            console.log(error);
          }     
        };

useEffect(() => {
    fetchData();
    console.log("Movies====>",movies);
},[]);

const handleSearch = async (val: string) => {
        const response = await fetch(`http://www.omdbapi.com/?s=${val ? val : "marvel"}&apikey=d25cc249`);
        const data = await response.json();
        // console.log("Searched data",data);
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setPage(1);
    }

    const handlePageChange = async (page: number) => {
        console.log("page chng",page);
        const response = await fetch(`http://www.omdbapi.com/?s=marvel&apikey=d25cc249&page=${page}`);
        const data = await response.json();
        setMovies(data.Search);
        setPage(page);
        
}

return (
<>
{showSearch &&
    <Search
      placeholder="input search text"
      allowClear
      onSearch={handleSearch}
      enterButton
    />
}
   
    <Divider orientation='left'></Divider>
    {movies ? 
    <>
    <h1>Add Heading</h1>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {movies.map((movie)=> (
          // <Link href={`/movieDetails?id=${movie.imdbID}`}>
          <Link href={ { pathname: '/movieDetails', query: { id: encodeURIComponent(movie.imdbID), data: encodeURIComponent(JSON.stringify(movie.imdbID)) } } }>
          <Col className="gutter-row">
          <Card hoverable style={{ width: 240, margin: '16px' }} 
          cover={<Image src={movie?.Poster !== 'N/A' ? movie?.Poster : '/assests/no_img.png'} 
          width={200} 
          height={200} 
          alt='No Image to Display'/>
      }
          >
              <Card.Meta title={movie.Title} description={movie.Year} />
            </Card>
            </Col>
            </Link>
      ))}
      </Row>   
      <Pagination
      current={page}
      total={totalResults}
      // pageSize={10}
      handlePageChange={handlePageChange}
      />
    </> : "No Data"
}
</>
)

// const [movies, setMovies] = useState<MovieData[]>([]);

//   const onSearch = async (value: string) => {
//     const response = await fetch(`http://www.omdbapi.com/?s=${value}&apikey=d25cc249`);
//     const data = await response.json();
//     setMovies(data.Search);
//   };

//   return (
//     <div>
//       <Search placeholder="input search text" onSearch={onSearch} enterButton />
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.imdbID}>
//             <img src={movie.Poster} alt={movie.Title} />
//             <h3>{movie.Title}</h3>
//             <p>{movie.Year}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
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
