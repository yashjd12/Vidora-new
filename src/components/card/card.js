import React, { useEffect, useState } from "react"
import "./card.css"
import { Link } from "react-router-dom"

const Cards = ({ movie }) => {

    return <>
        <Link to={`movie/${movie.videoId}`}>
            <div className="cards" key={movie.videoId}>
                <img className="cards__img" src={movie.thumbnail} />
                <div className="cards__overlay">
                    <div className="card__title">{movie ? movie.title : ""}</div>
                    <div className="card__description">{movie ? movie.description.slice(0, 118) + "..." : ""}</div>
                </div>
            </div>
        </Link>
    </>
}

export default Cards