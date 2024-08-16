import { useEffect, useState } from "react";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="container mx-auto my-14">
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
                                <div className="flex justify-between">
                                    <h2 className="card-title">{product.ProductName}</h2>
                                    <h2 className="card-title">Price: <span className="text-gray-500">${product.Price}</span></h2>
                                </div>
                                <h2 className="card-title">Brand: <span className="text-gray-500">{product.BrandName}</span></h2>
                                <hr className="my-4" />
                                <p>{product.Description}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-success">Buy Now</button>
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