import React, {useEffect, useState} from 'react';
import MovieService from "../services/movie";
import {Link} from "react-router-dom";

export default () => {
    const [suggestions, setSuggestions] = useState([]);
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value) {
            MovieService.seacrh(value).then((res) => {
                setSuggestions(res.data)
            })
        }
       // MovieService
    }
    return (
        <div>
            <input type="text" placeholder="Start ..." onChange={handleInputChange}/>
            <ul>
                {/* Displaying each suggestion as a list item */}
                {suggestions.map((suggestion, index) => (
                    <li key={index}>
                        <Link to={"/detail/"+suggestion.id} >
                        <img src={"https://image.tmdb.org/t/p/w200"+suggestion.backdrop_path}  style={{width:50}}/>
                        {suggestion.title}
                        </Link>
                    </li>

                ))}
            </ul>
        </div>
    )
}
