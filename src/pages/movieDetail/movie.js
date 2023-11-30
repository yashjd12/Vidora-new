import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import AWS from 'aws-sdk';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import Header from '../../components/header/Header';

const Movie = () => {
    const { id } = useParams()
    const [currentMovieDetail, setCurrentMovieDetail] = useState([]);
    const [isVideoPlayerOpen, setVideoPlayerOpen] = useState(false);
  
    useEffect(() => {
      AWS.config.update({
        region: 'us-east-1',
        accessKeyId: 'AKIASPLO73TEGMWTRHTM', // Replace with your AWS access key ID
        secretAccessKey: 'y0edFhq4R/O/gWUcUKxiKW9IOE6/xCa4EBcj5unu', // Replace with your AWS secret access key
      });
  
      const tableName = 'video-metadata'
      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: tableName,
      };
  
      docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error scanning DynamoDB table:', err);
        } else {
        setCurrentMovieDetail(
            data.Items.filter(item=>{
            return item.videoId === id
          })[0] )
        }
      });
    }, []);

    const playMovie = () =>{
        const hlsId = currentMovieDetail.hlsId;
        console.log(currentMovieDetail)
        setVideoPlayerOpen(true)
    }

    return (
        <>
        <Header />
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={currentMovieDetail ? currentMovieDetail.cover : ""}/>
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={currentMovieDetail ? currentMovieDetail.thumbnail : ""} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>

                        <div className="movie__genres" style={{marginTop:"40px"}}>
                            {currentMovieDetail && currentMovieDetail.tag
                                ? currentMovieDetail.tag.split(",").map((genre, index) => (
                                    <span className="movie__genre" key={index}>
                                    {genre}
                                    </span>
                                ))
                                : null}
                        </div>

                    </div>
                    <div className="movie__detailRightBottom" style = {{marginTop: "10px"}}>
                        <div className="synopsisText">Synopsis</div>
                        <div style = {{fontSize: "17px"}}>{currentMovieDetail ? currentMovieDetail.description : ""}</div>
                        <button onClick={playMovie} style={{marginTop: "20px",width:"100px",height:"40px",padding:"10px",fontWeight:"bold",borderRadius:"10px",background:"white",color:"black",fontSize:"15px"}}>Play</button>
                    </div>
                    
                </div>
            </div>
            {isVideoPlayerOpen?
                <VideoPlayer videoId={currentMovieDetail.videoId} hlsId={currentMovieDetail.hlsId}/>
                :null}
            </div>
            </>
    )
}

export default Movie