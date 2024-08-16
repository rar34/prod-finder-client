import { useState } from 'react';
import PropTypes from 'prop-types'

function SearchBar({ onSearch, onSort  }) {
    const [keyword, setKeyword] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    const handleSearch = () => {
        onSearch({ keyword });
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
        onSort(e.target.value);
    };

    return (
        <div className='flex flex-col gap-2 lg:flex-row'>
            <input
                className='input input-bordered mr-2'
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button className='btn text-white bg-[#6F42C1]' onClick={handleSearch}>Search</button>
            <select className='select select-primary ml-4' value={sortCriteria} onChange={handleSortChange}>
                <option disabled value="">Sort By</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="newestFirst">Date added: Newest First</option>
            </select>
        </div>
    );
}

export default SearchBar;

SearchBar.propTypes = {
    onSearch: PropTypes.node,
    onSort: PropTypes.node
}
