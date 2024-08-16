import { useState } from 'react';
import PropTypes from 'prop-types'

function SearchBar({ onSearch, onSort }) {
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
        <div className='flex flex-col gap-4'>
            <div className='flex border justify-between w-full border-green-600 p-6 rounded-lg flex-col gap-2 lg:flex-row'>
                <div className='flex items-center'>
                    <input
                        className='input input-bordered mx-2'
                        type="text"
                        placeholder="Keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className='btn text-white bg-green-600' onClick={handleSearch}>Search</button>
                </div>
                <select className='select select-success mx-2' value={sortCriteria} onChange={handleSortChange}>
                    <option disabled value="">Sort By</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="newestFirst">Date added: Newest First</option>
                </select>
            </div>
            
        </div>
    );
}

export default SearchBar;

SearchBar.propTypes = {
    onSearch: PropTypes.node,
    onSort: PropTypes.node
}
