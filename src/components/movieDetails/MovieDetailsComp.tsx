import React, {useState, useEffect} from "react";
import { Card, Row, Col, Tabs } from 'antd'
import Image from "next/image";
import styles from './MovieDetailsComp.module.css';
const { TabPane } = Tabs;

type MovieProps = {
    id: any;
}

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
    // ...
  }

//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: `Overview`,
//       children: `Content of Tab Pane 1`,
//     },
//     {
//       key: '2',
//       label: `Cast`,
//       children: `Content of Tab Pane 2`,
//     },
//     {
//       key: '3',
//       label: `Reviews`,
//       children: `Content of Tab Pane 3`,
//     },
//   ];

  interface Data {
    [key: string]: string;
  }

  const MovieDetailsComp: React.FC<MovieProps> = (props: any) => {
    const [movie, setMovie] = useState<MovieData>();
    // const [tabsData, setTabsData] = useState<Data>({});

    // const onChange = (key: string) => {
    //     setTabsData()
    //   };

    const fetchData = async () => {
        try {
          const response = await fetch(`http://www.omdbapi.com/?i=${props.id}&apikey=d25cc249`);
          const data = await response.json();
          setMovie(data);
        //   setTabsData(data);
          console.log("Movie full Data",data)
          console.log("data.Ratings[0].source",data.Ratings[0].Source)
        //   setTotalResults(parseInt(data.totalResults));
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        fetchData();
      },[])

    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                <Col className="gutter-row" span={8}>
                    <Card hoverable style={{ width: 450, height: 450, margin: '2rem' }} 
                        cover={<Image src={movie?.Poster !== 'N/A' ? movie?.Poster : '/assests/no_img.png'} width={200} height={400} alt='No Image to Display'/>
                    }
                        >
                            <Card.Meta title={movie?.Title} className={styles.movieTitle} style={{textTransform : 'uppercase' , textAlign: 'center'}}/>
                    </Card>
                        
                        <div>
                        {/* <Row className={styles.movieTitle} style={{textTransform : 'uppercase'}}>
                            {tabsData.Title}
                            </Row> */}

                        <Row className={styles.movieInfo}>
                            {movie?.Rated}
                            ,{movie?.Runtime}
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
                            <p>BoxOffice:</p> {movie?.BoxOffice ? movie?.BoxOffice : "N/A"}
                            </Row>

                            </div>
                </Col>

                <Col className="gutter-row" span={6}>   
                                <Tabs>
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
                    <div className={styles.movieRatings}>
    <p>Ratings</p>
    {movie && movie?.Ratings.map((rating: any) => (
        <>
            <div className={styles.row}>
                {rating.Source} ({rating.Value})
            </div>
        </>
    ))}
</div>
                </Col>

              

            </Row>
          
        </>
    )
}

export default MovieDetailsComp;