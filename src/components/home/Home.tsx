import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, Col, Divider, Row, Card } from "antd";
import Image from "next/image";
import styles from "./Home.module.css";
import Pagination from "@/components/pagination/Pagination";
import { getMovies } from "../../../services/api/index";

const inter = Inter({ subsets: ["latin"] });
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
  const router = useRouter();
  const { showSearch } = router.query;
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //Get data for Listing and Pagination
  const fetchData = async (page: any) => {
    const id = null;
    const str = "iron";
    const pageno = page;
    const data = await getMovies(id, str, pageno);
    setMovies(data.Search);
    setTotalResults(parseInt(data.totalResults));
    setPage(page);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  //Pass searched keyword in the URL and get matching results
  const handleSearch = async (val: string) => {
    console.log("Valllll", val);
    const id = null;
    const str = val ? val : "marvel";
    const pageno = null;
    const data = await getMovies(id, str, pageno);
    setMovies(data.Search);
    setTotalResults(parseInt(data.totalResults));
    setPage(1);
  };

  return (
    <>
      {showSearch && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8}>
          <Search
            className={styles.searchBar}
            placeholder="Search Movie"
            allowClear
            onSearch={handleSearch}
            enterButton
            required
          />
          </Col>
        </Row>
      )}

      <Divider key="divider" orientation="left" />
      {movies ? (
        <div className={styles.container}>
          <h1>Movies</h1>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {movies.map((movie) => (
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
                    style={{ width: 240, height: "auto", margin: "16px" }}
                    cover={
                      <Image
                        src={
                          movie?.Poster !== "N/A"
                            ? movie?.Poster
                            : "/assests/OIP.png"
                        }
                        width={200}
                        height={200}
                        alt="No Image to Display"
                      />
                    }
                  >
                    <Card.Meta title={movie.Title} description={movie.Year} />
                  </Card>
                </Col>
              </Link>
            ))}
          </Row>
        </div>
      ) : (
        "No Data"
      )}
      <Pagination
        current={page}
        total={totalResults}
        // pageSize={10}
        onChange={fetchData}
        hideOnSinglePage={true}
      />
    </>
  );
};

export default Home;
