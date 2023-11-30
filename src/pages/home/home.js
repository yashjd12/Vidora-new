import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieList from "../../components/movieList/movieList";
import AWS from 'aws-sdk';
import Header from '../../components/header/Header';

const Home = () => {

    const [items, setItems] = useState([]);
    //const [isVideoPlayerOpen, setVideoPlayerOpen] = useState(false);
  
    useEffect(() => {
      AWS.config.update({
        region: 'us-east-1',
        accessKeyId: 'AKIASPLO73TEGMWTRHTM', // Replace with your AWS access key ID
        secretAccessKey: 'y0edFhq4R/O/gWUcUKxiKW9IOE6/xCa4EBcj5unu', // Replace with your AWS secret access key
      });
  
      const tableName = 'video-metadata';
      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: tableName,
      };
  
      docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error scanning DynamoDB table:', err);
        } else {
          setItems(data.Items);
        }
      });
    }, []);

    return (
        <>
            <Header />
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        items.map(movie => (
                            <div>
                                <div className="posterImage">
                                    <img src={movie.thumbnail} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.title: ""}</div>
                                    <div className="posterImage__description">{movie ? movie.description : ""}</div>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home




