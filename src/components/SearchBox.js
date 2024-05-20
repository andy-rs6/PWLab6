import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input
                className="form-control"
                style={{
                    borderRadius: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '1rem',
                }}
                onChange={(event) => props.setSearchValue(event.target.value)}
                value={props.value}
                placeholder='Type to search'
            />
        </div>
    );
};

export default SearchBox;
