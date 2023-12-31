import RecommendMovies from "../components/recommend/RecommendMovies";
import { GetStaticProps } from "next";
import { getMovies } from "../../services/api/index";

interface Movie {
  Title: string;
  Poster: string;
  imdbID: string;
  Year: string;
}

interface Props {
  movies: Movie[];
}

const Recommend = ({ movies }: Props) => {
  return (
    <>
      <RecommendMovies movies={movies} />
    </>
  );
};

// To get movie recommendation based on str and change everyday
export const getStaticProps: GetStaticProps<Props> = async () => {
  const id = null;
  const str = "Love";
  const pageno = null;
  const moviesData = await getMovies(id, str, pageno);
  const movies = moviesData.Search;

  return {
    props: {
      movies,
    },
    revalidate: 60 * 60 * 24, // refresh every day
  };
};

export default Recommend;
