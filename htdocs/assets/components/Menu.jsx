import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import MovieService from '../services/movie';
export default () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        if(menu.length == 0) {
            MovieService.genres().then((res) => {
                setMenu(res.data.genres);
            })
        }
    }, [menu]);
    return (
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            {
                menu.map((item) => (
                    <li className="nav-item" key={item.id}>
                        <Link to={'/genre/'+item.id} className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span
                            className="ms-1 d-none d-sm-inline">{item.name}</span>
                        </Link>
                    </li>
                ))
            }

        </ul>
    )
}
