import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import MovieService from "../services/movie";

export default () => {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        if(!item) {
            MovieService.detail(id).then((res) => {
                setItem(res.data);
            })
        }
    }, [item,id]);
    useEffect(() => {
        console.log("Id => ", id)
        setItem(null);
    }, [id]);

    if (!item) {
        return  (<div>Wait ...</div>)
    }
    return (
        <div className="col-md-12">
                <div className="card">
                    <img src={"https://image.tmdb.org/t/p/w500/" + item.backdrop_path} className="card-img-top"
                         alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.overview}</p>
                        <p className="card-text">production_companies : <ul>{item.production_companies.map((el) => {
                            return (<li>{el.name}</li>)
                        })}</ul></p>
                        <p className="card-text">production countries :{item.production_countries[0].name}</p>
                        <p className="card-text">status: {item.status}</p>
                    </div>
                </div>
        </div>
    )
}
