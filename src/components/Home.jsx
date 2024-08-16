import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const { count } = useLoaderData();
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(count / itemsPerPage)



    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)


    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage]);


    const handleSearch = ({ keyword }) => {

        let filtered = products;

        if (keyword) {
            filtered = filtered.filter(p =>
                p.ProductName.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        setProducts(filtered);
        keyword = '';
    };


    const handleSort = (criteria) => {
        let sorted = [...products];
        switch (criteria) {
            case 'lowToHigh':
                sorted.sort((a, b) => a.Price - b.Price);
                break;
            case 'highToLow':
                sorted.sort((a, b) => b.Price - a.Price);
                break;
            case 'newestFirst':
                sorted.sort((a, b) => new Date(b.ProductCreationDate) - new Date(a.ProductCreationDate));
                break;
            default:
                break;
        }
        setProducts(sorted);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    // const filteredProducts = products.filter(product => {
    //     switch (selectedBrand) {
    //         case 'VisionX':
    //             return product.BrandName === 'VisionX';
    //         case 'PowerTech':
    //             return product.BrandName === 'PowerTech';
    //         case 'MobiLux':
    //             return product.BrandName === 'MobiLux';
    //         case 'CapturePro':
    //             return product.BrandName === 'CapturePro';
    //         case 'SecureCam':
    //             return product.BrandName === 'SecureCam';
    //         case 'QuietSound':
    //             return product.BrandName === 'QuietSound';
    //         default:
    //             return true;
    //     }
    // });

    const filterByPrice = (price) => {
        switch (selectedPriceRange) {
            case '< $100':
                return price < 100;
            case '$100 - $500':
                return price >= 100 && price <= 500;
            case '$500 - $1000':
                return price > 500 && price <= 1000;
            case '> $1000':
                return price > 1000;
            default:
                return true;
        }
    };

    const filteredProducts = products.filter(product => {
        const matchBrand = selectedBrand ? product.BrandName === selectedBrand : true;
        const matchCategory = selectedCategory ? product.Category === selectedCategory : true;
        const matchPrice = filterByPrice(product.Price);

        return matchBrand && matchCategory && matchPrice;
    });


    return (
        <div className="container mx-auto my-14">
            <div className="text-center flex flex-col gap-4 items-center justify-center mb-10">
                <SearchBar onSearch={handleSearch} onSort={handleSort}></SearchBar>
                <div className='flex border border-green-600 p-6 rounded-lg flex-col gap-2 lg:flex-row'>
                    {/* <input
                        className='input input-bordered mx-1'
                        type="text"
                        placeholder="Min price"

                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input
                        className='input input-bordered mx-1'
                        type="text"
                        placeholder="Max price"

                        onChange={(e) => setKeyword(e.target.value)}
                    /> */}
                    <select onChange={(e) => setSelectedPriceRange(e.target.value)} className='select select-success mx-2'>
                        <option value="">All</option>
                        <option value="< $100">Less than $100</option>
                        <option value="$100 - $500">$100 - $500</option>
                        <option value="$500 - $1000">$500 - $1000</option>
                        <option value="> $1000">Greater than $1000</option>
                    </select>

                    <select onChange={(e) => setSelectedBrand(e.target.value)} className='select select-success mx-2'>
                        <option value="">Brand Name</option>
                        <option value="VisionX">VisionX</option>
                        <option value="PowerTech">PowerTech</option>
                        <option value="MobiLux">MobiLux</option>
                        <option value="CapturePro">CapturePro</option>
                        <option value="SecureCam">SecureCam</option>
                        <option value="QuietSound">QuietSound</option>
                    </select>
                    <select onChange={(e)=>setSelectedCategory(e.target.value)} className='select select-success mx-2'>
                        <option value="">Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Audio">Audio</option>
                        <option value="Smart Home">Smart Home</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Personal Care">Personal Care</option>
                    </select>
                    <button className='btn text-white bg-green-600' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredProducts?.map(product =>
                        <div key={product._id} className="card bg-base-100 border border-green-600">
                            <figure>
                                <img
                                    src={product.ProductImage}
                                    alt={product.ProductName} />
                            </figure>
                            <div className="card-body">
                                <div className="flex text-2xl font-semibold justify-between">
                                    <h2 className="font-bold">{product.ProductName}</h2>
                                    <h2 className="">Price: <span className="text-gray-500">${product.Price}</span></h2>
                                </div>
                                <div className="flex text-lg font-medium justify-between">
                                    <h2 className="">Brand: <span className="text-gray-500">{product.BrandName}</span></h2>
                                    <h2 className="">Category: <span className="text-gray-500">{product.Category}</span></h2>
                                </div>
                                <hr className="my-4" />
                                <p>{product.Description}</p>
                                <hr className="my-4" />
                                <div className="flex text-lg font-medium justify-between">
                                    <h2 className="">Ratings: <span className="text-gray-500">{product.Ratings}</span></h2>
                                    <h2 className="">Added at: <span className="text-gray-500">{product.ProductCreationDate}</span></h2>
                                </div>
                                <div className="">
                                    <button className="btn w-full mt-6 btn-outline btn-success">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-center items-center">
                <button onClick={handlePrevPage} className="btn text-green-600 btn-sm">Previous</button>
                {
                    pages?.map((p, i) =>
                        <button onClick={() => setCurrentPage(p)} className={`btn btn-sm btn-success text-white my-6 mx-1 ${currentPage === p && 'bg-orange-400 border-0'}`} key={i}>{p + 1}</button>
                    )
                }
                <button onClick={handleNextPage} className="btn text-green-600 btn-sm">Next</button>
            </div>
        </div>
    );
};

export default Home;