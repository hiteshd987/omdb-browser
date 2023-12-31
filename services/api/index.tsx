export const getMovies = async (id: any, str: string, pageno: any) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?${
        id ? `i=${id}` : `s=${str}&type=movie`
      }&apikey=d25cc249&${pageno && `page=${pageno}`}`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
