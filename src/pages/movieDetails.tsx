import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MovieDetailsComp from "@/components/movieDetails/MovieDetailsComp";

const MovieDetails = () => {
  const router = useRouter();
  const { id, data } = router.query;

  return (
    <>
      <MovieDetailsComp id={id} />
    </>
  );
};

export default MovieDetails;
