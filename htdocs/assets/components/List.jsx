import React from 'react';
import Item from "./Item";
export default ({items}) => {
    return (
        <div className="row">
            {
                items.map((item) => <Item item={item} key={item.id}/>)
            }
        </div>
    )
}
