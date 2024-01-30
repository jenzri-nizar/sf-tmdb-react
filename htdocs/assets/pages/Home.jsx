import React, {useEffect, useState} from 'react';
import MovieService from "../services/movie";
import List from "../components/List";
import Search from "../components/Search";
export default () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        if(items.length == 0) {
            MovieService.getTop().then((res) => {
                setItems(res.data);
            })
        }
    }, [items]);

    return (
        <div >
            <Search />
            <List items={items} />
        </div>
    )
}
