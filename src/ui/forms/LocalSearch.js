import React from 'react';

const LocalSearch = ({keyword, setKeyword}) => {

    function handleSearch(event) {
        event.preventDefault()
        setKeyword(event.target.value.toLowerCase())
    }


    return (
        <div className='mb-3'>
            <input
                type="search"
                placeholder='Filter'
                value={keyword}
                className='form-control'
                onChange={handleSearch}/>
        </div>
    );
};

export default LocalSearch;