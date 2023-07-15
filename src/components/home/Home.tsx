import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Divider, Row, Card, Input, Spin } from "antd";
import Image from "next/image";
import styles from "./Home.module.css";
import Pagination from "@/components/pagination/Pagination";
import { getMovies } from "../../../services/api/index";
const { Search } = Input;

type HomeProps = {};

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

const Home: React.FC<HomeProps> = () => {
  const { showSearch } = useRouter().query;
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [movieTitle, setMovieTitle] = useState("iron");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedData, setSearchedData] = useState("");

  //Get data for Listing and Pagination
  const handleFetchData = async (page: any) => {
    setIsLoading(true);
    const movieId = null;
    const searchQuery = searchedData ? searchedData : movieTitle;
    const pageNumber = page;
    try {
      const data = await getMovies(movieId, searchQuery, pageNumber);
      setMovies(data?.Search || []);
      setTotalResults(parseInt(data?.totalResults) || 0);
      setPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData(1);
  }, [searchedData]);

  //Pass searched keyword in the URL and get matching results
  const handleSearch = async (searchValue: string) => {
    setSearchedData(searchValue);
    handleFetchData(1);
  };

  return (
    <>
      {showSearch && (
        <Search
          className={styles.searchBar}
          placeholder="Search Movie"
          allowClear
          onSearch={handleSearch}
          enterButton
        />
      )}

      <Divider key="divider" orientation="left" />

      {isLoading ? (
        <div className={styles.spinningDiv}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {
            // Show various cards to display movies
            movies ? (
              <div className={styles.container}>
                <h1>Movies</h1>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {movies.map((movie) => (
                    <Link
                      key={movie.imdbID}
                      href={{
                        pathname: "/movieDetails",
                        query: {
                          id: movie.imdbID,
                          data: JSON.stringify(movie.imdbID),
                        },
                      }}
                    >
                      <Col key={movie.imdbID}>
                        <Card
                          hoverable
                          className={styles.cardStyle}
                          cover={
                            <Image
                              src={
                                movie?.Poster !== "N/A"
                                  ? movie?.Poster
                                  : "/assets/noimg.png"
                              }
                              width={200}
                              height={200}
                              alt="No Image to Display"
                            />
                          }
                        >
                          <Card.Meta
                            title={movie.Title}
                            description={movie.Year}
                          />
                        </Card>
                      </Col>
                    </Link>
                  ))}
                </Row>
              </div>
            ) : (
              "No Data"
            )
          }
        </>
      )}

      <Pagination
        current={page}
        total={totalResults}
        onChange={handleFetchData}
        hideOnSinglePage={true}
      />
    </>
  );
};

export default Home;
