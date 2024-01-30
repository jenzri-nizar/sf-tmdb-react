import React from 'react';
import {Link} from "react-router-dom";
export default ({item}) => {
    return (
        <div className="col-md-4">
            <Link to={"/detail/"+item.id} >
                <div className="card">
                    <img src={"https://image.tmdb.org/t/p/w500/"+item.backdrop_path} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.overview}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
