import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


const SearchBox = (props) => {

    return (
        <div className="col col-sm4">
            <input className="form-input" onChange={(event) => props.setSearchValue(event.target.value)} value={props.value} placeholder='Type to search'></input>
        </div>
    );
};

export default SearchBox;