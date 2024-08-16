import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(count / itemsPerPage)



    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)


    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);


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



    return (
        <div className="container mx-auto my-14">
            <div className="text-center flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
                <SearchBar onSearch={handleSearch} onSort={handleSort}></SearchBar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    products?.map(product =>
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
            <p>current page: {currentPage + 1}</p>
        </div>
    );
};

export default Home;