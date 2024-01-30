import React, {useEffect, useState} from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import List from "../components/List";
import MovieService from "../services/movie";

export default () => {
    let { id } = useParams();
    const [items, setItems] = useState([]);
    useEffect(() => {
        if(items.length == 0) {
            MovieService.byGenre(id).then((res) => {
                setItems(res.data);
            })
        }
    }, [items,id]);
    useEffect(() => {
        console.log("Id => ", id)
        setItems([]);
    }, [id]);
    return (
        <div >
            <List items={items} />
        </div>
    )
}
