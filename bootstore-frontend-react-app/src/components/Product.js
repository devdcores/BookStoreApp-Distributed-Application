import React, { Component } from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom'

class Product extends Component {

    constructor() {
        super();
    }
    // {
    //     _id: '2',
    //     name: 'Fit Shirt',
    //     category: 'Shirts',
    //     image: '/images/d1.jpg',
    //     price: 50,
    //     brand: ' Nike',
    //     rating: 4.2,
    //     numReviews: 5
    // }
    render() {
        const { product } = this.props;
        return (
            <div className="featured-product-item">
                <div style={{ "background-image": "url('/images/products/p1.jpg')" }} className="featured-product-item-image"></div>
                <div className="title">{product.productName}</div>
                <div className="description">{product.productCategory}</div>
                <div className="description">{product.description}</div>
                <div className="price">Price - {product.price}$</div>
                <Rating rating={product.averageRating} numReviews={product.numReviews}></Rating>
                <Link to={'/product/' + product._id}><button>View Item</button></Link>
            </div >
        );
    }
}

export default Product;
