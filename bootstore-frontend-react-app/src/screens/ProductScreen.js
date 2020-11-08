import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ProductScreen = (props) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:8765/api/catalog/product/'+props.match.params.id)
                .then((response) => {
                    console.log(response.data);
                    setProduct(response.data)
                });
                
        };
        fetchData();
    }, [])
    if (!product) {
        return (<div>Product Not Found!!</div>)
    }
    return (
        <div>
            <Link to="/">Back to result</Link>
            <div className="product-container">
                <div className="product-container-img">
                    <img className="large" src={product.image} alt="product.name"></img>
                </div>
                <div className="product-container-details">
                    <h3> Product Details</h3>
                    <div className="product-container-details-body">
                        <div className="product-container-details-body-item">
                            <label ><b>Brand : </b></label>{product.productCategory}
                        </div>
                        <div className="product-container-details-body-item">
                            <label>Name : </label>{product.productName}
                        </div>
                        <div className="product-container-details-body-item">
                            <label>Price : </label>{product.price} $
                </div>
                        <div className="product-container-details-body-item">
                            <Rating rating={product.averageRating} numReviews={product.noOfReviews}></Rating>
                        </div>

                        <button> Add to Cart </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductScreen;