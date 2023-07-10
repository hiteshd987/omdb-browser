import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tabs, Divider } from "antd";
import Image from "next/image";
import styles from "./MovieDetailsComp.module.css";
import Link from "next/link";
import { getMovies } from "../../../services/api";
const { TabPane } = Tabs;

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

const MovieDetailsComp: React.FC<MovieProps> = (props: any) => {
  const [movie, setMovie] = useState<MovieData>();
  const [relatedMV, setRelatedMV] = useState<MovieData[]>([]);

  const fetchData = async () => {
    // get a specific movie on which we click
    try {
      const id = props.id;
      const str = "";
      const pageno = null;
      const dataMovie = await getMovies(id, str, pageno);
      setMovie(dataMovie);

      const genre = dataMovie.Genre;
      const arr = genre.split(",");
      const keyword = arr[0].trim();
      const dataGenre = await getMovies(null, keyword, pageno);
      setRelatedMV(dataGenre.Search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.id]);

  return (
    <>
      <Row gutter={[16, 16]}>
        {movie ? (
          <>
            <Col key="Col1" xs={24} sm={24} md={24} lg={8}>
              <Card
                hoverable
                style={{ width: 450, height: 450, margin: "2rem" }}
                cover={
                  <Image
                    src={
                      movie?.Poster !== "N/A"
                        ? movie?.Poster
                        : "/assests/no_img.png"
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
                  style={{ textTransform: "uppercase", textAlign: "center" }}
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

            <Col key="Col2" xs={24} sm={24} md={24} lg={10}>
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
        )}

        <Col key="Col3" xs={24} sm={24} md={24} lg={6}>
          <h1 key="headingMV" className={styles.movieInfo}>
            Related Movies
          </h1>
          {relatedMV
            ? relatedMV?.slice(0, 4).map((movie) => (
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
                  <Col key={movie.imdbID} className="gutter-row">
                    <Card
                      hoverable
                      style={{ width: 300, margin: "16px" }}
                      cover={
                        <Image
                          src={
                            movie?.Poster !== "N/A"
                              ? movie?.Poster
                              : "/assests/no_img.png"
                          }
                          width={250}
                          height={150}
                          alt="No Image to Display"
                        />
                      }
                    >
                      <Card.Meta title={movie.Title} description={movie.Year} />
                    </Card>
                  </Col>
                </Link>
              ))
            : "No Related Movies to Display"}
        </Col>
      </Row>
    </>
  );
};

export default MovieDetailsComp;
