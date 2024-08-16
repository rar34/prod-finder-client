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
                                <div className="flex text-2xl font-semibold justify-between">
                                    <h2 className="">{product.ProductName}</h2>
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