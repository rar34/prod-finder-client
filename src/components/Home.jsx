import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

const Home = () => {

    const [products, setProducts] = useState([]);

    // const [filteredProducts, setFilteredProducts] = useState(products)

    // useEffect(() => {
    //     fetch("http://localhost:5000/products")
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchProducts();
      }, []);


    const handleSearch = ({ keyword, startDate, endDate }) => {

        console.log(keyword, startDate, endDate)
        let filtered = products;

        if (keyword) {
            filtered = filtered.filter(p =>
                p.ProductName.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(p => new Date(p.ProductCreationDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(p => new Date(p.ProductCreationDate) <= new Date(endDate));
        }

        setProducts(filtered);
        keyword = '';
        startDate = '';
        endDate = '';
    };




    return (
        <div className="container mx-auto my-14">
            <div className="text-center flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
                <SearchBar onSearch={handleSearch}></SearchBar>
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
        </div>
    );
};

export default Home;