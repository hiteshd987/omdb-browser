import { Card } from "antd";
import Link from "next/link";
import styles from "./RecommendMovies.module.css";

interface Movie {
  Title: string;
  Poster: string;
  imdbID: string;
  Year: string;
}

interface Props {
  movies: Movie[];
}

// Iterate data from props to show Cards
const RecommendMovies = ({ movies }: Props) => {
  return (
    <div className={styles.recommendContainer} key="divMain">
      <h1 key="heading">Recommendations of the day</h1>

      <div className={styles.divCard} key="divCard">
        {movies.slice(0, 5).map((movie) => (
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
            <Card
              key={movie.imdbID}
              hoverable
              style={{ width: 300, margin: "16px" }}
              cover={<img alt={movie.Title} src={movie.Poster} />}
            >
              <Card.Meta title={movie.Title} description={movie?.Year} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendMovies;
