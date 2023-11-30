import React, {useEffect, useState} from "react"
import "./movieList.css"
import Cards from "../card/card"
import AWS from 'aws-sdk';

const MovieList = () => {
    
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
        <div className="movie__list">
            <h2 className="list__title">POPULAR</h2>
            <div className="list__cards">
                {
                    items.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList