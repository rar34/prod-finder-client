import { useState } from 'react';
import PropTypes from 'prop-types'

function SearchBar({ onSearch, onSort  }) {
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    const handleSearch = () => {
        onSearch({ keyword, startDate, endDate });
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
            <input
                className='input input-bordered mr-2'
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                className='input input-bordered mr-2'
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button className='btn text-white bg-[#6F42C1]' onClick={handleSearch}>Search</button>
            <select className='select select-primary ml-4' value={sortCriteria} onChange={handleSortChange}>
                <option disabled value="">Sort By</option>
                <option value="mostRegistered">Price: Low to High</option>
                <option value="campFees">Price: High to Low</option>
                <option value="alphabetical">Date added: Newest First</option>
            </select>
        </div>
    );
}

export default SearchBar;

SearchBar.propTypes = {
    onSearch: PropTypes.node,
    onSort: PropTypes.node
}
