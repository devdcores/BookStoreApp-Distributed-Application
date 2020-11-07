import React from 'react';
import Rating from '../components/Rating';
import data from '../data';
import {Link} from 'react-router-dom'

const ProductScreen = (props) => {
    const product = data.products.find(x => x._id === props.match.params.id);
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
                            <label ><b>Brand : </b></label>{product.brand}
                        </div>
                        <div className="product-container-details-body-item">
                            <label>Name : </label>{product.name}
                        </div>
                        <div className="product-container-details-body-item">
                            <label>Price : </label>{product.price} $
                </div>
                        <div className="product-container-details-body-item">
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </div>

                        <button> Add to Cart </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductScreen;