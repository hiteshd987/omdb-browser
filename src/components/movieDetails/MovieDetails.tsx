import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tabs, Spin } from "antd";
import { Inter } from "next/font/google";
import Image from "next/image";
import styles from "./MovieDetails.module.css";
import Link from "next/link";
import { getMovies } from "../../../services/api";
const { TabPane } = Tabs;
const inter = Inter({ subsets: ["latin"] });

type MovieProps = {
  id: any;
};

interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  imdbID: string;
  Poster: any;
  Search: any;
  Genre: string;
  Director: string;
  BoxOffice: string;
  Plot: string;
  imdbRating: string;
  Actors: string;
  Language: string;
  Writer: string;
  Awards: string;
  Ratings: any;
}

const MovieDetailsComp: React.FC<MovieProps> = ({ id }) => {
  const [movie, setMovie] = useState<MovieData | undefined>(undefined);
  const [relatedMV, setRelatedMV] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    // get a specific movie on which we click
    try {
      const movieId = id;
      const searchQuery = "";
      const pageNumber = null;
      const dataMovie = await getMovies(movieId, searchQuery, pageNumber);
      setMovie(dataMovie);

      const genre = dataMovie.Genre;
      const genreArr = genre.split(",");
      const keyword = genreArr[0].trim();
      const genreData = await getMovies(null, keyword, pageNumber);
      setRelatedMV(genreData.Search as MovieData[]);
    } catch (error) {
      console.log("Error fetching Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row key="rowMain" className={inter.className} gutter={[16, 16]}>
          {
            // Three columns to show movie Card with details and some related movies based on Genre
            movie ? (
              <>
                <Col
                  className={styles.column1Style}
                  key="Column1"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={7}
                >
                  <Card
                    hoverable
                    className={styles.movieCard}
                    // style={{ width: 450, height: 450, margin: "2rem" }}
                    cover={
                      <Image
                        src={
                          movie?.Poster !== "N/A"
                            ? movie?.Poster
                            : "/assets/noimg.png"
                        }
                        width={200}
                        height={400}
                        alt="No Image to Display"
                      />
                    }
                  >
                    <Card.Meta
                      title={movie?.Title}
                      className={styles.movieTitle}
                      style={{
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    />
                  </Card>

                  <div>
                    {/* <Row className={styles.movieTitle} style={{textTransform : 'uppercase'}}>
                          {tabsData.Title}
                          </Row> */}

                    <Row className={styles.movieInfo}>
                      {movie?.Rated},{movie?.Runtime}
                    </Row>

                    <Row className={styles.movieInfo}>
                      <p>Genre:</p> {movie?.Genre}
                    </Row>

                    <Row className={styles.movieInfo}>
                      <p>Directed By:</p> {movie?.Director}
                    </Row>

                    <Row className={styles.movieInfo}>
                      <p>In Theaters:</p> {movie?.Released}
                    </Row>

                    <Row className={styles.movieInfo}>
                      <p>BoxOffice:</p>{" "}
                      {movie?.BoxOffice ? movie?.BoxOffice : "N/A"}
                    </Row>
                  </div>
                </Col>

                <Col
                  className={styles.column2Style}
                  key="Column2"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={11}
                >
                  <div key="tabsDiv" className={styles.movieInfoTabs}>
                    <Tabs key="tabs">
                      <TabPane tab="Overview" key="plot">
                        {movie?.Plot}
                      </TabPane>
                      <TabPane tab="Cast" key="actors">
                        {movie?.Actors}
                      </TabPane>
                      <TabPane tab="Writers" key="writers">
                        {movie?.Writer}
                      </TabPane>
                      <TabPane tab="Language" key="language">
                        {movie?.Language}
                      </TabPane>
                      <TabPane tab="Awards" key="awards">
                        {movie?.Awards}
                      </TabPane>
                    </Tabs>
                  </div>
                  <div key={movie?.imdbID} className={styles.movieRatings}>
                    <p>Ratings</p>
                    {movie &&
                      movie?.Ratings?.map((rating: any) => (
                        <>
                          <div key="ratingsDiv" className={styles.row}>
                            {rating.Source} ({rating.Value})
                          </div>
                        </>
                      ))}
                  </div>
                </Col>
              </>
            ) : (
              "No Data to Display"
            )
          }

          <Col key="Column3" xs={24} sm={24} md={24} lg={5}>
            <h1 key="headingMV" className={styles.movieInfo}>
              Related Movies
            </h1>
            {relatedMV.length === 0
              ? "No Related Movies to Display"
              : relatedMV.slice(0, 4).map((movie) => (
                  <Link
                    key={movie.imdbID}
                    href={{
                      pathname: "/movieDetails",
                      query: {
                        id: encodeURIComponent(movie.imdbID),
                        data: encodeURIComponent(JSON.stringify(movie.imdbID)),
                      },
                    }}
                  >
                    <div>
                      <Card
                        hoverable
                        className={styles.relatedMovieCard}
                        // style={{ width: 300, margin: "16px" }}
                        cover={
                          <Image
                            src={
                              movie?.Poster !== "N/A"
                                ? movie?.Poster
                                : "/assets/noimg.png"
                            }
                            width={250}
                            height={250}
                            alt="No Image to Display"
                          />
                        }
                      >
                        <Card.Meta
                          title={movie.Title}
                          description={movie.Year}
                        />
                      </Card>
                    </div>
                  </Link>
                ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default MovieDetailsComp;
